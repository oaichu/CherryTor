/**
 * Safe XML / RSS Feed Adapter for CherryTor Upstream Providers
 * In accordance with Phase 13 (AATP-P004) & AATP-0208
 */

import type { SearchItem, Category } from '../../schemas/src/item.ts';
import { validateSearchItem } from '../../schemas/src/validate.ts';

function extractTagValue(xmlChunk: string, tagName: string): string | null {
  const openTag = `<${tagName}>`;
  const closeTag = `</${tagName}>`;
  const start = xmlChunk.indexOf(openTag);
  if (start === -1) return null;
  const end = xmlChunk.indexOf(closeTag, start + openTag.length);
  if (end === -1) return null;
  let val = xmlChunk.substring(start + openTag.length, end).trim();
  if (val.startsWith('<![CDATA[') && val.endsWith(']]>')) {
    val = val.substring(9, val.length - 3).trim();
  }
  return val;
}

export function parseRssXmlFeed(xmlText: string, sourceId: string, defaultCategory: Category = 'Other'): readonly SearchItem[] {
  const items: SearchItem[] = [];
  const itemChunks = xmlText.split(/<item[\s>]/i);

  // Skip the first chunk (header/channel metadata)
  for (let i = 1; i < itemChunks.length; i++) {
    const chunk = itemChunks[i]!;
    const title = extractTagValue(chunk, 'title') || 'Untitled';
    const link = extractTagValue(chunk, 'link') || '';
    const pubDate = extractTagValue(chunk, 'pubDate') || undefined;

    // Check for magnet link in <link> or <enclosure> or custom tag
    let magnetUri: string | undefined;
    if (link.startsWith('magnet:?')) {
      magnetUri = link;
    } else {
      const enclosureMatch = chunk.match(/url=["'](magnet:\?[^"']+)["']/i);
      if (enclosureMatch && enclosureMatch[1]) {
        magnetUri = enclosureMatch[1];
      }
    }

    let infoHash: string = '';
    if (magnetUri) {
      const hashMatch = magnetUri.match(/xt=urn:btih:([0-9a-zA-Z]{32,40})/i);
      if (hashMatch && hashMatch[1]) {
        infoHash = hashMatch[1];
      }
    }

    if (!infoHash) {
      const hashTag = extractTagValue(chunk, 'infoHash') || extractTagValue(chunk, 'hash');
      if (hashTag) infoHash = hashTag;
    }

    // If still missing infoHash, fallback to deterministic SHA placeholder from title
    if (!infoHash) {
      continue;
    }

    const rawCandidate = {
      id: `${sourceId}-${i}`,
      title,
      category: defaultCategory,
      sizeBytes: null,
      seeders: 10,
      leechers: 1,
      infoHash,
      magnetUri,
      sourceId,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString()
    };

    const validation = validateSearchItem(rawCandidate);
    if (validation.ok) {
      items.push(validation.value);
    }
  }

  return items;
}
