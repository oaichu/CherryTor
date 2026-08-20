import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRankingSignals, rankSearchItems } from '../../packages/core/src/ranking.ts';
import type { SearchItem } from '../../packages/schemas/src/item.ts';

test('Ranking Engine - computes higher scores for healthy, fresh releases', () => {
  const freshHealthy: SearchItem = {
    id: '1',
    title: 'Ubuntu 24.04.1 LTS',
    category: 'Software',
    sizeBytes: 6000000000,
    seeders: 4000,
    leechers: 100,
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    magnetUri: 'magnet:?xt=urn:btih:2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'canonical-releases',
    publishedAt: new Date().toISOString()
  };

  const deadOld: SearchItem = {
    id: '2',
    title: 'Obsolete Release',
    category: 'Other',
    sizeBytes: null,
    seeders: 0,
    leechers: 0,
    infoHash: '1111111111111111111111111111111111111111',
    sourceId: 'untrusted',
    publishedAt: '2020-01-01T00:00:00Z'
  };

  const signalsA = calculateRankingSignals(freshHealthy);
  const signalsB = calculateRankingSignals(deadOld);

  assert.ok(signalsA.score > signalsB.score);
  assert.ok(signalsA.availability > signalsB.availability);

  const ranked = rankSearchItems([deadOld, freshHealthy]);
  assert.equal(ranked[0]?.id, '1');
});
