import type { SearchItem, RankingSignals } from '../../schemas/src/item.ts';

export function calculateRankingSignals(item: SearchItem, now: Date = new Date()): RankingSignals {
  // 1. Availability Signal (0.0 to 1.0)
  const seeders = item.seeders ?? 0;
  const availability = seeders <= 0 ? 0.1 : Math.min(1.0, Math.log10(seeders + 1) / 3.5);

  // 2. Freshness Signal (0.0 to 1.0)
  let freshness = 0.5;
  if (item.publishedAt) {
    const publishedTime = new Date(item.publishedAt).getTime();
    const ageDays = Math.max(0, (now.getTime() - publishedTime) / (1000 * 60 * 60 * 24));
    if (ageDays <= 14) freshness = 1.0;
    else if (ageDays <= 60) freshness = 0.85;
    else if (ageDays <= 180) freshness = 0.70;
    else if (ageDays <= 365) freshness = 0.55;
    else freshness = 0.40;
  }

  // 3. Metadata Completeness (0.0 to 1.0)
  let completenessScore = 0;
  if (item.sizeBytes !== null && item.sizeBytes > 0) completenessScore += 0.3;
  if (item.magnetUri && item.magnetUri.length > 0) completenessScore += 0.3;
  if (item.publishedAt && item.publishedAt.length > 0) completenessScore += 0.2;
  if (item.category && item.category !== 'Other') completenessScore += 0.2;
  const metadataCompleteness = completenessScore;

  // 4. Provider Confidence
  let providerConfidence = 0.90;
  if (item.sourceId.includes('canonical') || item.sourceId.includes('arch') || item.sourceId.includes('debian')) {
    providerConfidence = 0.99;
  } else if (item.sourceId.includes('blender') || item.sourceId.includes('godot')) {
    providerConfidence = 0.95;
  }

  // 5. Aggregate Weighted Score (0 to 100)
  const weighted =
    availability * 0.45 +
    freshness * 0.20 +
    metadataCompleteness * 0.20 +
    providerConfidence * 0.15;

  const score = parseFloat((weighted * 100).toFixed(1));

  return {
    availability: parseFloat(availability.toFixed(2)),
    freshness: parseFloat(freshness.toFixed(2)),
    metadataCompleteness: parseFloat(metadataCompleteness.toFixed(2)),
    providerConfidence: parseFloat(providerConfidence.toFixed(2)),
    score
  };
}

export function rankSearchItems(items: readonly SearchItem[], now: Date = new Date()): readonly SearchItem[] {
  const ranked = items.map(item => {
    const signals = calculateRankingSignals(item, now);
    const updated: SearchItem = {
      ...item,
      rankingSignals: signals
    };
    return updated;
  });

  return ranked.sort((a, b) => (b.rankingSignals?.score ?? 0) - (a.rankingSignals?.score ?? 0));
}
