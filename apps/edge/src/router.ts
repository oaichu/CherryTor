import { validateProviderSearchQuery } from '../../../packages/schemas/src/validate.ts';
import type { NormalizedGatewayResponse } from '../../../packages/schemas/src/item.ts';
import { getProviderConfig } from '../../../packages/providers/src/registry.ts';
import { buildProviderUrl } from '../../../packages/providers/src/builder.ts';
import { safeFetchProvider } from '../../../packages/providers/src/fetcher.ts';
import { parseProviderResponse } from '../../../packages/providers/src/parser.ts';
import { normalizeAndValidateQuery } from '../../../packages/core/src/query.ts';
import { withTimeout } from '../../../packages/core/src/timeout.ts';
import { CircuitBreaker } from '../../../packages/core/src/circuit-breaker.ts';
import { SlidingWindowRateLimiter } from '../../../packages/core/src/rate-limiter.ts';
import { mapErrorToGatewayResponse, ValidationError } from '../../../packages/core/src/errors.ts';
import { tokenizeQuery, filterRelevantItems } from '../../../packages/core/src/relevance.ts';

// In-memory circuit breakers and rate limiter for Worker isolate
const circuitBreakers = new Map<string, CircuitBreaker>();
export const globalRateLimiter = new SlidingWindowRateLimiter({ maxRequests: 600, windowMs: 60000 });

function getOrCreateCircuitBreaker(providerId: string): CircuitBreaker {
  let cb = circuitBreakers.get(providerId);
  if (!cb) {
    cb = new CircuitBreaker(providerId);
    circuitBreakers.set(providerId, cb);
  }
  return cb;
}

export async function handleSearchApiRequest(request: Request): Promise<Response> {
  const startTime = Date.now();
  const url = new URL(request.url);

  // Anti-Proxy Guard (INV-01, INV-02)
  if (url.searchParams.has('target') || url.searchParams.has('url') || url.pathname.includes('/proxy')) {
    return new Response(
      JSON.stringify({
        data: [],
        errors: ['[INV-02_VIOLATION] Arbitrary proxy and ?target= requests are strictly forbidden'],
        meta: { provider: 'unknown', latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        data: [],
        errors: ['Method not allowed. Use POST /api/v1/search'],
        meta: { provider: 'unknown', latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      { status: 405, headers: { 'Content-Type': 'application/json', Allow: 'POST' } }
    );
  }

  // Rate Limiting Guard (AATP-0217). Only cf-connecting-ip is trusted: it is set
  // by Cloudflare for every Worker request. x-forwarded-for is client-spoofable
  // and was removed as a fallback (AATP-D2 / FIND-007).
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown-client';
  const rateLimitStatus = globalRateLimiter.check(clientIp);

  if (!rateLimitStatus.allowed) {
    return new Response(
      JSON.stringify({
        data: [],
        errors: [`[RATE_LIMITED] Too many requests. Please retry in ${rateLimitStatus.retryAfterSeconds} seconds.`],
        meta: { provider: 'edge', latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimitStatus.retryAfterSeconds),
          'X-RateLimit-Limit': String(globalRateLimiter.config.maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(rateLimitStatus.resetTimestamp / 1000))
        }
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        data: [],
        errors: ['Malformed JSON request body'],
        meta: { provider: 'unknown', latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const validation = validateProviderSearchQuery(body);
  if (!validation.ok) {
    return new Response(
      JSON.stringify({
        data: [],
        errors: validation.errors,
        meta: { provider: 'unknown', latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { provider: providerId, query: rawQuery } = validation.value;
  const config = getProviderConfig(providerId);
  if (!config) {
    return new Response(
      JSON.stringify({
        data: [],
        errors: [`Provider '${providerId}' is not approved or enabled in server registry`],
        meta: { provider: providerId, latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const cb = getOrCreateCircuitBreaker(providerId);

  try {
    cb.assertCanExecute();
    const sanitizedQuery = normalizeAndValidateQuery(rawQuery);
    const targetUrl = buildProviderUrl(config, sanitizedQuery, validation.value.category);

    const items = await withTimeout(
      async (signal: AbortSignal) => {
        const upstreamResponse = await safeFetchProvider({ config, url: targetUrl, signal });
        if (!upstreamResponse.ok) {
          throw new Error(`Upstream provider ${providerId} returned HTTP ${upstreamResponse.status}`);
        }
        return parseProviderResponse(config, upstreamResponse);
      },
      config.timeoutMs,
      providerId
    );

    cb.recordSuccess();

    // AATP-S1 (FIND-016): firehose feeds ignore the query server-side, so the
    // edge drops titles that share no query token before merging into results.
    const relevantItems = config.unfilteredSearch
      ? filterRelevantItems(items, tokenizeQuery(sanitizedQuery))
      : items;

    const responsePayload: NormalizedGatewayResponse = {
      data: relevantItems,
      errors: [],
      meta: {
        provider: providerId,
        latencyMs: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
        'X-Content-Type-Options': 'nosniff',
        'X-RateLimit-Limit': String(globalRateLimiter.config.maxRequests),
        'X-RateLimit-Remaining': String(rateLimitStatus.remaining)
      }
    });
  } catch (err: unknown) {
    // AATP-R005 (FIND-005): only upstream/provider failures may open the circuit
    // breaker. ValidationError is thrown by query normalization/URL building and is
    // caused by the client — counting it would let any client open the breaker.
    if (!(err instanceof ValidationError)) {
      cb.recordFailure();
    }
    const serialized = mapErrorToGatewayResponse(err, providerId);
    const statusCode = serialized.code === 'VALIDATION_ERROR' ? 400 : 502;

    const errorPayload: NormalizedGatewayResponse = {
      data: [],
      errors: [`[${serialized.code}] ${serialized.message}`],
      meta: {
        provider: providerId,
        latencyMs: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }
    };

    return new Response(JSON.stringify(errorPayload), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
}
