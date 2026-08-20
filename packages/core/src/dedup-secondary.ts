import type { SearchItem } from '../../schemas/src/item.ts';

const TITLE_CLEAN_REGEX = /[._\-[\]()]/g;
const EXTRA_WHITESPACE_REGEX = /\s+/g;

export function normalizeTitleForFuzzyMatch(title: string): string {
  return title
    .toLowerCase()
    .replace(TITLE_CLEAN_REGEX, ' ')
    .replace(EXTRA_WHITESPACE_REGEX, ' ')
    .trim();
}

export function deduplicateSecondary(items: readonly SearchItem[], sizeTolerancePercent: number = 1.0): readonly SearchItem[] {
  const result: SearchItem[] = [];

  for (const item of items) {
    const normTitle = normalizeTitleForFuzzyMatch(item.title);
    let matchedIndex = -1;

    for (let i = 0; i < result.length; i++) {
      const candidate = result[i]!;

      // Must share identical category
      if (candidate.category !== item.category) {
        continue;
      }

      const candTitle = normalizeTitleForFuzzyMatch(candidate.title);
      if (candTitle === normTitle) {
        // Compare sizes if both have sizes
        if (candidate.sizeBytes !== null && item.sizeBytes !== null) {
          const diffBytes = Math.abs(candidate.sizeBytes - item.sizeBytes);
          const maxBytes = Math.max(candidate.sizeBytes, item.sizeBytes);
          const percentDiff = (diffBytes / maxBytes) * 100;

          if (percentDiff <= sizeTolerancePercent) {
            matchedIndex = i;
            break;
          }
        }
      }
    }

    if (matchedIndex >= 0) {
      const existing = result[matchedIndex]!;
      const combinedSeeders = Math.max(existing.seeders ?? 0, item.seeders ?? 0);
      const combinedLeechers = Math.max(existing.leechers ?? 0, item.leechers ?? 0);
      const sourceIds = Array.from(new Set([...existing.sourceId.split(','), item.sourceId])).join(',');

      result[matchedIndex] = {
        ...existing,
        seeders: combinedSeeders,
        leechers: combinedLeechers,
        sourceId: sourceIds,
        ...(existing.magnetUri || item.magnetUri ? { magnetUri: existing.magnetUri || item.magnetUri } : {})
      };
    } else {
      result.push(item);
    }
  }

  return result;
}
