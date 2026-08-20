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

  let currentUrl = url;
  let redirectCount = 0;

  while (redirectCount <= maxRedirects) {
    const headers = buildSanitizedProviderHeaders(config);

    let response: Response;
    try {
      const fetchInit: RequestInit = {
        method: 'GET',
        headers,
        redirect: 'manual', // Invariant AATP-0204
        ...(signal !== undefined ? { signal } : {})
      };

      response = await fetch(currentUrl.toString(), fetchInit);
    } catch (err: unknown) {
      if (err instanceof Error && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
        throw err;
      }
      throw new ProviderUnavailableError(
        `Failed to reach upstream provider ${config.id}: ${err instanceof Error ? err.message : String(err)}`,
        config.id
      );
    }

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

      // Validate redirect destination hostname against allowlist (AATP-0204 / INV-02)
      const allowedHosts = new Set(config.allowedRedirectHosts.map(h => h.toLowerCase()));
      const destHost = redirectUrl.hostname.toLowerCase();

      if (!allowedHosts.has(destHost)) {
        throw new ProviderBadResponseError(
          `Redirect escape blocked: ${destHost} is not in provider ${config.id} allowedRedirectHosts`,
          config.id
        );
      }

      currentUrl = redirectUrl;
      redirectCount++;
      continue;
    }

    return response;
  }

  throw new ProviderBadResponseError(`Max redirect limit (${maxRedirects}) exceeded for provider ${config.id}`, config.id);
}
