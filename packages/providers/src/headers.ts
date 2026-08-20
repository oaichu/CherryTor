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

  headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');
  headers.set('Accept', config.format === 'xml' ? 'application/xml, text/xml, application/rss+xml, text/plain, */*' : 'application/json, text/plain, */*');
  headers.set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6');
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
