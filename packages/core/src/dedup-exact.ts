import type { SearchItem } from '../../schemas/src/item.ts';

export function deduplicateByInfoHash(items: readonly SearchItem[]): readonly SearchItem[] {
  const hashIndex = new Map<string, SearchItem>();

  for (const item of items) {
    const key = item.infoHash.toLowerCase().trim();
    const existing = hashIndex.get(key);

    if (!existing) {
      hashIndex.set(key, item);
      continue;
    }

    // Merge duplicate: retain highest seeders/leechers and combine sources
    const combinedSeeders = Math.max(existing.seeders ?? 0, item.seeders ?? 0);
    const combinedLeechers = Math.max(existing.leechers ?? 0, item.leechers ?? 0);
    const sourceIds = Array.from(new Set([...existing.sourceId.split(','), item.sourceId])).join(',');

    const mergedItem: SearchItem = {
      ...existing,
      seeders: combinedSeeders,
      leechers: combinedLeechers,
      sourceId: sourceIds,
      ...(existing.magnetUri || item.magnetUri ? { magnetUri: existing.magnetUri || item.magnetUri } : {})
    };

    hashIndex.set(key, mergedItem);
  }

  return Array.from(hashIndex.values());
}
