import type { ProviderEndpointConfig } from './types.ts';
import { ValidationError } from '../../core/src/errors.ts';

export function buildProviderUrl(config: ProviderEndpointConfig, query: string, category?: string): URL {
  if (!query || typeof query !== 'string') {
    throw new ValidationError('Search query must be a non-empty string', config.id);
  }

  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0 || trimmedQuery.length > 200) {
    throw new ValidationError('Search query length must be between 1 and 200 characters', config.id);
  }

  const encodedQuery = encodeURIComponent(trimmedQuery);
  const relativePath = config.pathTemplate.replace('{query}', encodedQuery);

  let targetUrl: URL;
  try {
    targetUrl = new URL(relativePath, config.origin);
  } catch {
    throw new ValidationError(`Failed to construct valid URL for provider: ${config.id}`, config.id);
  }

  // AATP-S4: upstream-side category narrowing when the provider supports it.
  // Only whitelisted param values from the registry map are ever written.
  if (category && category !== 'ALL' && config.categoryParam) {
    const mappedValue = config.categoryParam.map[category];
    if (mappedValue !== undefined) {
      targetUrl.searchParams.set(config.categoryParam.param, mappedValue);
    }
  }

  const originUrl = new URL(config.origin);

  // Security Verification (INV-01, INV-02, INV-03)
  if (targetUrl.protocol !== 'https:') {
    throw new ValidationError(`Provider URL protocol must be https:, got ${targetUrl.protocol}`, config.id);
  }

  if (targetUrl.hostname.toLowerCase() !== originUrl.hostname.toLowerCase()) {
    throw new ValidationError(
      `Constructed URL hostname (${targetUrl.hostname}) does not match approved origin (${originUrl.hostname})`,
      config.id
    );
  }

  if (targetUrl.username !== '' || targetUrl.password !== '') {
    throw new ValidationError('Credentials in provider URL are strictly forbidden', config.id);
  }

  return targetUrl;
}
