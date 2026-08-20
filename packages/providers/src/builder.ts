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
  let relativePath = config.pathTemplate.replace('{query}', encodedQuery);

  // Category Parameter Injection for Upstream Feeds
  const upperCat = (category || 'ALL').toUpperCase();
  if (upperCat !== 'ALL') {
    if (config.id === 'apibay') {
      if (upperCat === 'MUSIC') relativePath += '&cat=100';
      else if (upperCat === 'MOVIES') relativePath += '&cat=200';
      else if (upperCat === 'SOFTWARE') relativePath += '&cat=300';
      else if (upperCat === 'GAMES') relativePath += '&cat=400';
      else if (upperCat === 'BOOKS') relativePath += '&cat=601';
    } else if (config.id === 'nyaa') {
      if (upperCat === 'ANIME') relativePath += '&c=1_0';
      else if (upperCat === 'MUSIC') relativePath += '&c=2_0';
      else if (upperCat === 'BOOKS') relativePath += '&c=3_0';
      else if (upperCat === 'GAMES') relativePath += '&c=6_0';
      else if (upperCat === 'MOVIES') relativePath += '&c=4_0';
    } else if (config.id === 'dmhy') {
      if (upperCat === 'ANIME') relativePath += '&sort_id=2';
      else if (upperCat === 'GAMES') relativePath += '&sort_id=3';
      else if (upperCat === 'MUSIC') relativePath += '&sort_id=4';
      else if (upperCat === 'MOVIES') relativePath += '&sort_id=6';
    }
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(relativePath, config.origin);
  } catch {
    throw new ValidationError(`Failed to construct valid URL for provider: ${config.id}`, config.id);
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
