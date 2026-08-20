import type { ProviderEndpointConfig } from './types.ts';

const FORBIDDEN_FORWARD_HEADERS: ReadonlySet<string> = new Set([
  'cookie',
  'authorization',
  'origin',
  'referer',
  'x-forwarded-for',
  'x-forwarded-proto',
  'x-forwarded-host',
  'cf-connecting-ip',
  'cf-ray',
  'cf-ipcountry',
  'x-real-ip'
]);

export function buildSanitizedProviderHeaders(
  config: ProviderEndpointConfig,
  customHeaders?: Readonly<Record<string, string>>
): Headers {
  const headers = new Headers();

  // Standard safe baseline headers
  headers.set('User-Agent', 'CherryTor-EdgeGateway/1.0 (SafeMetadataAggregator)');
  headers.set('Accept', config.format === 'xml' ? 'application/xml, text/xml' : 'application/json');
  headers.set('Accept-Encoding', 'gzip, deflate, br');
  headers.set('Cache-Control', 'no-cache');

  if (customHeaders) {
    for (const [key, value] of Object.entries(customHeaders)) {
      const lowerKey = key.toLowerCase();
      if (!FORBIDDEN_FORWARD_HEADERS.has(lowerKey)) {
        headers.set(key, value);
      }
    }
  }

  return headers;
}

export function isForwardableHeader(headerName: string): boolean {
  return !FORBIDDEN_FORWARD_HEADERS.has(headerName.toLowerCase());
}
