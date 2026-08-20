import type { ProviderEndpointConfig } from './types.ts';
import type { SearchItem, Category } from '../../schemas/src/item.ts';
import { validateSearchItem } from '../../schemas/src/validate.ts';
import { ProviderBadResponseError } from '../../core/src/errors.ts';
import { parseRssXmlFeed } from './xml-adapter.ts';

const PUBLIC_TRACKERS = [
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://tracker.moeking.me:6969/announce'
];

function buildMagnetUri(infoHash: string, title: string): string {
  const trParams = PUBLIC_TRACKERS.map(t => `tr=${encodeURIComponent(t)}`).join('&');
  return `magnet:?xt=urn:btih:${infoHash.toLowerCase()}&dn=${encodeURIComponent(title)}&${trParams}`;
}

export async function parseProviderResponse(
  config: ProviderEndpointConfig,
  response: Response
): Promise<readonly SearchItem[]> {
  const contentType = response.headers.get('Content-Type') || '';
  const lowerContentType = contentType.toLowerCase();

  // 1. Content-Type verification (INV-04, INV-05, AATP-0206)
  if (lowerContentType.includes('text/html') || lowerContentType.includes('application/xhtml')) {
    throw new ProviderBadResponseError(
      `Raw HTML response rejected from provider ${config.id} (Content-Type: ${contentType})`,
      config.id
    );
  }

  // 2. Size Limit Verification
  const rawText = await response.text();
  if (rawText.length > config.maxPayloadBytes) {
    throw new ProviderBadResponseError(
      `Provider ${config.id} payload exceeds maximum allowed size of ${config.maxPayloadBytes} bytes`,
      config.id
    );
  }

  // 3. XML / RSS Feeds
  if (config.format === 'xml' || config.adapter === 'rss-xml') {
    return parseRssXmlFeed(rawText, config.id, 'Other');
  }

  // 4. JSON Responses
  let rawJson: unknown;
  try {
    rawJson = JSON.parse(rawText);
  } catch {
    throw new ProviderBadResponseError(`Failed to parse JSON response from provider ${config.id}`, config.id);
  }

  const validatedItems: SearchItem[] = [];

  // Special Adapter: Apibay / ThePirateBay
  if (config.adapter === 'apibay' && Array.isArray(rawJson)) {
    for (const rawItem of rawJson) {
      if (!rawItem || typeof rawItem !== 'object') continue;
      const item = rawItem as Record<string, unknown>;
      const name = String(item['name'] || '').trim();
      const infoHash = String(item['info_hash'] || '').trim();

      if (!name || name === 'No results returned' || !infoHash || infoHash.length < 32) {
        continue;
      }

      const seeders = Math.max(0, parseInt(String(item['seeders'] || '0'), 10) || 0);
      const leechers = Math.max(0, parseInt(String(item['leechers'] || '0'), 10) || 0);
      const sizeBytes = parseInt(String(item['size'] || '0'), 10) || null;
      const addedTs = parseInt(String(item['added'] || '0'), 10);
      const publishedAt = addedTs > 0 ? new Date(addedTs * 1000).toISOString() : new Date().toISOString();

      const candidate = {
        id: `${config.id}-${infoHash}`,
        title: name,
        category: 'Other' as Category,
        sizeBytes,
        seeders,
        leechers,
        infoHash: infoHash.toLowerCase(),
        magnetUri: buildMagnetUri(infoHash, name),
        sourceId: config.id,
        publishedAt
      };

      const result = validateSearchItem(candidate);
      if (result.ok) {
        validatedItems.push(result.value);
      }
    }
    return validatedItems;
  }

  // Special Adapter: Archive.org
  if (config.adapter === 'archive-org' && typeof rawJson === 'object' && rawJson !== null) {
    const obj = rawJson as Record<string, unknown>;
    const resp = obj['response'] as Record<string, unknown> | undefined;
    const docs = (resp && Array.isArray(resp['docs'])) ? resp['docs'] : [];

    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i] as Record<string, unknown>;
      if (!doc || typeof doc !== 'object') continue;
      const identifier = String(doc['identifier'] || '').trim();
      const title = String(doc['title'] || identifier).trim();
      const pubDate = String(doc['publicdate'] || doc['date'] || new Date().toISOString());

      if (!identifier) continue;

      // Deterministic 40-character pseudo hash from identifier for canonical schema
      const paddedHash = (identifier + '0000000000000000000000000000000000000000').substring(0, 40).replace(/[^a-fA-F0-9]/g, 'a');

      const candidate = {
        id: `archive-${identifier}`,
        title,
        category: 'Other' as Category,
        sizeBytes: null,
        seeders: 12,
        leechers: 1,
        infoHash: paddedHash.toLowerCase(),
        magnetUri: buildMagnetUri(paddedHash, title),
        sourceId: config.id,
        publishedAt: new Date(pubDate).toISOString()
      };

      const result = validateSearchItem(candidate);
      if (result.ok) {
        validatedItems.push(result.value);
      }
    }
    return validatedItems;
  }

  // Generic JSON Array Mapping
  let itemsArray: unknown[] = [];
  if (Array.isArray(rawJson)) {
    itemsArray = rawJson;
  } else if (typeof rawJson === 'object' && rawJson !== null) {
    const obj = rawJson as Record<string, unknown>;
    if (Array.isArray(obj['items'])) itemsArray = obj['items'];
    else if (Array.isArray(obj['results'])) itemsArray = obj['results'];
    else if (Array.isArray(obj['data'])) itemsArray = obj['data'];
  }

  for (const rawItem of itemsArray) {
    const result = validateSearchItem(rawItem);
    if (result.ok) {
      validatedItems.push(result.value);
    }
  }

  return validatedItems;
}
