/**
 * Safe XML / RSS Feed Adapter for CherryTor Upstream Providers
 * In accordance with Phase 13 (AATP-P004) & AATP-0208
 */

import type { SearchItem, Category } from '../../schemas/src/item.ts';
import { validateSearchItem } from '../../schemas/src/validate.ts';

const PUBLIC_TRACKERS = [
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://tracker.moeking.me:6969/announce'
];

export function buildMagnet(infoHash: string, title: string): string {
  const trs = PUBLIC_TRACKERS.map(t => `tr=${encodeURIComponent(t)}`).join('&');
  return `magnet:?xt=urn:btih:${infoHash.toLowerCase()}&dn=${encodeURIComponent(title)}&${trs}`;
}

export function parseHumanSizeToBytes(raw: string | number | null | undefined): number | null {
  if (typeof raw === 'number') {
    return Number.isInteger(raw) && raw > 1 ? raw : null;
  }
  if (!raw || typeof raw !== 'string') return null;

  const str = raw.trim();
  if (/^\d+$/.test(str)) {
    const n = parseInt(str, 10);
    return n > 1 ? n : null;
  }

  // Regex matching e.g. "1.45 GB", "750 MB", "2.1 GiB", "850.5 MiB", "15.2 KB", "2.5TB"
  const match = str.match(/(\d+(?:\.\d+)?)\s*(T|G|M|K)(?:i)?B/i);
  if (!match || !match[1] || !match[2]) return null;

  const val = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  if (unit === 'T') return Math.round(val * 1024 * 1024 * 1024 * 1024);
  if (unit === 'G') return Math.round(val * 1024 * 1024 * 1024);
  if (unit === 'M') return Math.round(val * 1024 * 1024);
  if (unit === 'K') return Math.round(val * 1024);

  return null;
}

function extractTagValue(xmlChunk: string, tagName: string): string | null {
  const openTag = `<${tagName}>`;
  const closeTag = `</${tagName}>`;
  const start = xmlChunk.indexOf(openTag);
  if (start === -1) {
    const match = xmlChunk.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
    if (match && match[1]) {
      let val = match[1].trim();
      if (val.startsWith('<![CDATA[') && val.endsWith(']]>')) {
        val = val.substring(9, val.length - 3).trim();
      }
      return val;
    }
    return null;
  }
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

  for (let i = 1; i < itemChunks.length; i++) {
    const chunk = itemChunks[i]!;
    const title = extractTagValue(chunk, 'title') || 'Untitled';
    const link = extractTagValue(chunk, 'link') || '';
    const guid = extractTagValue(chunk, 'guid') || '';
    const pubDate = extractTagValue(chunk, 'pubDate') || undefined;
    const description = extractTagValue(chunk, 'description') || '';

    // Check for magnet link in <link> or <enclosure> or raw chunk
    let magnetUri: string | undefined;
    if (link.startsWith('magnet:?')) {
      magnetUri = link;
    } else {
      const magnetMatch = chunk.match(/magnet:\?[^\s"'<>]+/i);
      if (magnetMatch && magnetMatch[0]) {
        magnetUri = magnetMatch[0].replace(/&amp;/g, '&');
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
      infoHash = extractTagValue(chunk, 'nyaa:infoHash') ||
                 extractTagValue(chunk, 'infoHash') ||
                 extractTagValue(chunk, 'hash') || '';
    }

    if (!infoHash) {
      const hexMatch = (guid + ' ' + link + ' ' + chunk).match(/\b([0-9a-fA-F]{40})\b/);
      if (hexMatch && hexMatch[1]) {
        infoHash = hexMatch[1];
      }
    }

    if (!infoHash || infoHash.length < 32) {
      continue;
    }

    if (!magnetUri) {
      magnetUri = buildMagnet(infoHash, title);
    }

    // Swarm seeds / leechers
    const seedersStr = extractTagValue(chunk, 'nyaa:seeders') || extractTagValue(chunk, 'seeders');
    const seeders = seedersStr ? Math.max(0, parseInt(seedersStr, 10) || 0) : 10;

    const leechersStr = extractTagValue(chunk, 'nyaa:leechers') || extractTagValue(chunk, 'leechers');
    const leechers = leechersStr ? Math.max(0, parseInt(leechersStr, 10) || 0) : 1;

    // Smart File Size Extraction
    let sizeBytes: number | null = null;
    const rawSizeTag = extractTagValue(chunk, 'nyaa:size') || extractTagValue(chunk, 'size') || extractTagValue(chunk, 'torrent:contentLength');
    if (rawSizeTag) {
      sizeBytes = parseHumanSizeToBytes(rawSizeTag);
    }

    if (!sizeBytes) {
      const lengthMatch = chunk.match(/length=["'](\d+)["']/i);
      if (lengthMatch && lengthMatch[1]) {
        const parsedLen = parseInt(lengthMatch[1], 10);
        if (parsedLen > 1024) sizeBytes = parsedLen;
      }
    }

    // Try extracting size from title or description (e.g. "[1.4 GB]", "(850MB)", "2.1GiB")
    if (!sizeBytes) {
      sizeBytes = parseHumanSizeToBytes(title) || parseHumanSizeToBytes(description);
    }

    const rawCandidate = {
      id: `${sourceId}-${infoHash}`,
      title,
      category: defaultCategory,
      sizeBytes,
      seeders,
      leechers,
      infoHash: infoHash.toLowerCase(),
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
