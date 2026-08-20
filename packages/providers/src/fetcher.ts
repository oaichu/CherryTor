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

        if (!response.ok && candidateOrigins.length > 1 && response.status >= 500) {
          throw new ProviderBadResponseError(`Provider ${config.id} origin returned HTTP ${response.status}`, config.id);
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
