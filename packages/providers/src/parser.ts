import type { ProviderEndpointConfig } from './types.ts';
import type { SearchItem, Category } from '../../schemas/src/item.ts';
import { validateSearchItem } from '../../schemas/src/validate.ts';
import { ProviderBadResponseError } from '../../core/src/errors.ts';
import { parseRssXmlFeed, buildMagnet, parseHumanSizeToBytes } from './xml-adapter.ts';

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

  // Special Adapter: YTS (Movies with exact size_bytes)
  if (config.adapter === 'yts' && typeof rawJson === 'object' && rawJson !== null) {
    const obj = rawJson as Record<string, unknown>;
    const data = obj['data'] as Record<string, unknown> | undefined;
    const movies = (data && Array.isArray(data['movies'])) ? data['movies'] : [];

    for (const movie of movies) {
      if (!movie || typeof movie !== 'object') continue;
      const movieObj = movie as Record<string, unknown>;
      const movieTitle = String(movieObj['title_long'] || movieObj['title'] || 'Movie');
      const torrents = Array.isArray(movieObj['torrents']) ? movieObj['torrents'] : [];

      for (const tor of torrents) {
        if (!tor || typeof tor !== 'object') continue;
        const t = tor as Record<string, unknown>;
        const hash = String(t['hash'] || '').trim();
        if (!hash || hash.length < 32) continue;

        const quality = String(t['quality'] || 'HD');
        const sizeBytes = typeof t['size_bytes'] === 'number' ? t['size_bytes'] : null;
        const seeders = typeof t['seeds'] === 'number' ? Math.max(0, t['seeds']) : 10;
        const leechers = typeof t['peers'] === 'number' ? Math.max(0, t['peers']) : 1;
        const title = `${movieTitle} [${quality}]`;

        const candidate = {
          id: `${config.id}-${hash}`,
          title,
          category: 'Movies' as Category,
          sizeBytes,
          seeders,
          leechers,
          infoHash: hash.toLowerCase(),
          magnetUri: buildMagnet(hash, title),
          sourceId: config.id,
          publishedAt: new Date().toISOString()
        };

        const res = validateSearchItem(candidate);
        if (res.ok) validatedItems.push(res.value);
      }
    }
    return validatedItems;
  }

  // Special Adapter: EZTV (TV Shows with exact size_bytes)
  if (config.adapter === 'eztv' && typeof rawJson === 'object' && rawJson !== null) {
    const obj = rawJson as Record<string, unknown>;
    const torrents = Array.isArray(obj['torrents']) ? obj['torrents'] : [];

    for (const tor of torrents) {
      if (!tor || typeof tor !== 'object') continue;
      const t = tor as Record<string, unknown>;
      const hash = String(t['hash'] || '').trim();
      const title = String(t['title'] || 'Episode').trim();
      if (!hash || hash.length < 32) continue;

      const sizeBytes = typeof t['size_bytes'] === 'number' && t['size_bytes'] > 0 ? t['size_bytes'] : null;
      const seeders = typeof t['seeds'] === 'number' ? Math.max(0, t['seeds']) : 5;
      const leechers = typeof t['peers'] === 'number' ? Math.max(0, t['peers']) : 1;

      const candidate = {
        id: `${config.id}-${hash}`,
        title,
        category: 'TV' as Category,
        sizeBytes,
        seeders,
        leechers,
        infoHash: hash.toLowerCase(),
        magnetUri: String(t['magnet_url'] || buildMagnet(hash, title)),
        sourceId: config.id,
        publishedAt: new Date().toISOString()
      };

      const res = validateSearchItem(candidate);
      if (res.ok) validatedItems.push(res.value);
    }
    return validatedItems;
  }

  // Special Adapter: SolidTorrents (DHT with exact size)
  if (config.adapter === 'solidtorrents' && typeof rawJson === 'object' && rawJson !== null) {
    const obj = rawJson as Record<string, unknown>;
    const results = Array.isArray(obj['results']) ? obj['results'] : [];

    for (const item of results) {
      if (!item || typeof item !== 'object') continue;
      const t = item as Record<string, unknown>;
      const hash = String(t['infoHash'] || t['hash'] || '').trim();
      const title = String(t['title'] || '').trim();
      if (!hash || !title || hash.length < 32) continue;

      const swarm = (t['swarm'] && typeof t['swarm'] === 'object') ? (t['swarm'] as Record<string, unknown>) : {};
      const seeders = typeof swarm['seeders'] === 'number' ? Math.max(0, swarm['seeders']) : 5;
      const leechers = typeof swarm['leechers'] === 'number' ? Math.max(0, swarm['leechers']) : 1;
      const sizeBytes = typeof t['size'] === 'number' && t['size'] > 0 ? t['size'] : null;

      const catRaw = String(t['category'] || '').toLowerCase();
      let mappedCategory: Category = 'Other';
      if (catRaw.includes('video') || catRaw.includes('movie') || catRaw.includes('show')) {
        mappedCategory = 'Movies';
      } else if (catRaw.includes('game')) {
        mappedCategory = 'Games';
      } else if (catRaw.includes('program') || catRaw.includes('app') || catRaw.includes('software')) {
        mappedCategory = 'Software';
      } else if (catRaw.includes('music') || catRaw.includes('audio')) {
        mappedCategory = 'Music';
      } else if (catRaw.includes('book') || catRaw.includes('ebook')) {
        mappedCategory = 'Other';
      } else if (catRaw.includes('anime')) {
        mappedCategory = 'Anime';
      } else {
        const lower = title.toLowerCase();
        if (/(1080p|2160p|720p|4k|bluray|web-dl|x264|x265|hevc|remux|dvdrip|bdrip|hdrip|season|s0\d|e0\d|movie)/i.test(lower)) {
          mappedCategory = 'Movies';
        } else if (/(repack|fitgirl|dodi|iso|crack|patch|trainer|switch|nsp|xci|gog|game)/i.test(lower)) {
          mappedCategory = 'Games';
        } else if (/(flac|mp3|320kbps|lossless|alac|discography|soundtrack|ost)/i.test(lower)) {
          mappedCategory = 'Music';
        } else if (/(pdf|epub|mobi|cbz|cbr|book)/i.test(lower)) {
          mappedCategory = 'Other';
        } else if (/(setup|installer|x64|x86|windows|macos|linux|portable|v\d+\.\d+)/i.test(lower)) {
          mappedCategory = 'Software';
        }
      }

      const candidate = {
        id: `${config.id}-${hash}`,
        title,
        category: mappedCategory,
        sizeBytes,
        seeders,
        leechers,
        infoHash: hash.toLowerCase(),
        magnetUri: String(t['magnet'] || buildMagnet(hash, title)),
        sourceId: config.id,
        publishedAt: String(t['imported'] || new Date().toISOString())
      };

      const res = validateSearchItem(candidate);
      if (res.ok) validatedItems.push(res.value);
    }
    return validatedItems;
  }

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

      const catCode = parseInt(String(item['category'] || '0'), 10) || 0;
      let mappedCategory: Category = 'Other';
      if (catCode >= 200 && catCode < 300) {
        mappedCategory = 'Movies';
      } else if (catCode >= 400 && catCode < 500) {
        mappedCategory = 'Games';
      } else if (catCode >= 300 && catCode < 400) {
        mappedCategory = 'Software';
      } else if (catCode >= 100 && catCode < 200) {
        mappedCategory = 'Music';
      } else if (catCode >= 600 && catCode < 700) {
        mappedCategory = 'Other';
      } else {
        const lower = name.toLowerCase();
        if (/(1080p|2160p|720p|4k|bluray|web-dl|x264|x265|hevc|remux|dvdrip|bdrip|hdrip|season|s0\d|e0\d|movie)/i.test(lower)) {
          mappedCategory = 'Movies';
        } else if (/(repack|fitgirl|dodi|iso|crack|patch|trainer|switch|nsp|xci|gog|game)/i.test(lower)) {
          mappedCategory = 'Games';
        } else if (/(flac|mp3|320kbps|lossless|alac|discography|soundtrack|ost)/i.test(lower)) {
          mappedCategory = 'Music';
        } else if (/(pdf|epub|mobi|cbz|cbr|book)/i.test(lower)) {
          mappedCategory = 'Other';
        } else if (/(setup|installer|x64|x86|windows|macos|linux|portable|v\d+\.\d+)/i.test(lower)) {
          mappedCategory = 'Software';
        }
      }

      const candidate = {
        id: `${config.id}-${infoHash}`,
        title: name,
        category: mappedCategory,
        sizeBytes,
        seeders,
        leechers,
        infoHash: infoHash.toLowerCase(),
        magnetUri: buildMagnet(infoHash, name),
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

      let sizeBytes: number | null = null;
      if (typeof doc['item_size'] === 'number' && doc['item_size'] > 0) {
        sizeBytes = doc['item_size'];
      } else if (typeof doc['size'] === 'number' && doc['size'] > 0) {
        sizeBytes = doc['size'];
      } else if (typeof doc['item_size'] === 'string') {
        const parsed = parseInt(doc['item_size'], 10);
        if (!isNaN(parsed) && parsed > 0) sizeBytes = parsed;
      }
      if (!sizeBytes) {
        sizeBytes = parseHumanSizeToBytes(title);
      }

      const paddedHash = (identifier + '0000000000000000000000000000000000000000').substring(0, 40).replace(/[^a-fA-F0-9]/g, 'a');

      const candidate = {
        id: `archive-${identifier}`,
        title,
        category: 'Other' as Category,
        sizeBytes,
        seeders: 12,
        leechers: 1,
        infoHash: paddedHash.toLowerCase(),
        magnetUri: buildMagnet(paddedHash, title),
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

  // Generic JSON Array
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
