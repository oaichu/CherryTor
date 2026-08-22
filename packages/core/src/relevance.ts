/**
 * Server-side relevance gate for providers that ignore search keywords
 * ("firehose" feeds such as EZTV / LinuxTracker — AATP-S1, FIND-016).
 * Their latest-uploads noise must never leak into merged search results.
 */

export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(tok => tok.length >= 2);
}

export function isRelevantTitle(title: string, tokens: readonly string[]): boolean {
  if (tokens.length === 0) return true;
  const lowerTitle = title.toLowerCase();
  return tokens.some(tok => lowerTitle.includes(tok));
}

export function filterRelevantItems<T extends { title: string }>(
  items: readonly T[],
  tokens: readonly string[]
): readonly T[] {
  if (tokens.length === 0) return items;
  return items.filter(item => isRelevantTitle(item.title, tokens));
}
