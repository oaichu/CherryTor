import type { ProviderEndpointConfig } from './types.ts';
import { ProviderBadResponseError, ProviderUnavailableError } from '../../core/src/errors.ts';
import { buildSanitizedProviderHeaders } from './headers.ts';

export interface SafeFetchOptions {
  readonly config: ProviderEndpointConfig;
  readonly url: URL;
  readonly signal?: AbortSignal;
  readonly maxRedirects?: number;
}

export async function safeFetchProvider(options: SafeFetchOptions): Promise<Response> {
  const { config, url, signal, maxRedirects = 2 } = options;

  const candidateOrigins = [config.origin, ...(config.mirrors || [])];
  let lastError: Error | null = null;

  for (const origin of candidateOrigins) {
    try {
      const candidateUrl = new URL(url.pathname + url.search, origin);
      let currentUrl = candidateUrl;
      let redirectCount = 0;

      while (redirectCount <= maxRedirects) {
        const headers = buildSanitizedProviderHeaders(config);

        const fetchInit: RequestInit = {
          method: 'GET',
          headers,
          redirect: 'manual', // Invariant AATP-0204
          ...(signal !== undefined ? { signal } : {})
        };

        const response = await fetch(currentUrl.toString(), fetchInit);

        // Handle Redirects manually
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('Location');
          if (!location) {
            throw new ProviderBadResponseError(`Provider ${config.id} returned 3xx without Location header`, config.id);
          }

          let redirectUrl: URL;
          try {
            redirectUrl = new URL(location, currentUrl);
          } catch {
            throw new ProviderBadResponseError(`Provider ${config.id} returned malformed redirect URI: ${location}`, config.id);
          }

          // Validate redirect destination hostname against allowlist
          const allowedHosts = new Set([
            ...config.allowedRedirectHosts.map(h => h.toLowerCase()),
            ...(config.mirrors ? config.mirrors.map(m => new URL(m).hostname.toLowerCase()) : [])
          ]);
          const destHost = redirectUrl.hostname.toLowerCase();

          if (!allowedHosts.has(destHost)) {
            throw new ProviderBadResponseError(
              `Redirect to unapproved host '${destHost}' blocked for provider ${config.id}`,
              config.id
            );
          }

          currentUrl = redirectUrl;
          redirectCount++;
          continue;
        }

        // AATP-S3 (FIND-011): a mirror that blocks us (403/429), is broken (5xx) or
        // serves an HTML challenge page instead of the API falls through to the next
        // mirror. 404 and other 4xx are genuine upstream answers and stay terminal.
        const contentType = (response.headers.get('Content-Type') || '').toLowerCase();
        const looksLikeHtml = contentType.includes('text/html') || contentType.includes('application/xhtml');
        const blockedOrBroken = response.status === 403 || response.status === 429 || response.status >= 500;

        if (candidateOrigins.length > 1 && blockedOrBroken && !response.ok) {
          throw new ProviderBadResponseError(`Provider ${config.id} origin ${currentUrl.hostname} returned HTTP ${response.status}`, config.id);
        }
        if (candidateOrigins.length > 1 && response.ok && looksLikeHtml) {
          throw new ProviderBadResponseError(`Provider ${config.id} origin ${currentUrl.hostname} returned an HTML challenge page instead of structured data`, config.id);
        }

        return response;
      }
    } catch (err: unknown) {
      if (err instanceof Error && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
        throw err;
      }
      lastError = err instanceof Error ? err : new Error(String(err));
      // Continue loop to next mirror
    }
  }

  throw (
    lastError ||
    new ProviderUnavailableError(`Failed to reach any mirror for upstream provider ${config.id}`, config.id)
  );
}
