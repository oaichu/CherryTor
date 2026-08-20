import test from 'node:test';
import assert from 'node:assert/strict';
import { deduplicateByInfoHash } from '../../packages/core/src/dedup-exact.ts';
import { deduplicateSecondary } from '../../packages/core/src/dedup-secondary.ts';
import type { SearchItem } from '../../packages/schemas/src/item.ts';

test('Exact Deduplication - merges items with identical infoHash and combines seeds', () => {
  const itemA: SearchItem = {
    id: 'item-1',
    title: 'Ubuntu 24.04 Desktop ISO',
    category: 'Software',
    sizeBytes: 6000000000,
    seeders: 100,
    leechers: 10,
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'canonical-releases'
  };

  const itemB: SearchItem = {
    id: 'item-2',
    title: 'Ubuntu 24.04 (Noble Numbat)',
    category: 'Software',
    sizeBytes: 6000000000,
    seeders: 500,
    leechers: 5,
    infoHash: '2B9E19D8463E264EF81C81EF40D41D1A1ECDE012', // Uppercase variation
    sourceId: 'arch-mirror'
  };

  const merged = deduplicateByInfoHash([itemA, itemB]);
  assert.equal(merged.length, 1);
  assert.equal(merged[0]?.seeders, 500);
  assert.ok(merged[0]?.sourceId.includes('canonical-releases'));
  assert.ok(merged[0]?.sourceId.includes('arch-mirror'));
});

test('Secondary Deduplication - merges identical titles with matching size within tolerance', () => {
  const itemA: SearchItem = {
    id: 'a',
    title: 'Big.Buck.Bunny.4K.Remaster',
    category: 'Movies',
    sizeBytes: 8000000000,
    seeders: 100,
    leechers: 5,
    infoHash: '1111111111111111111111111111111111111111',
    sourceId: 'src1'
  };

  const itemB: SearchItem = {
    id: 'b',
    title: 'Big Buck Bunny 4K Remaster',
    category: 'Movies',
    sizeBytes: 8000000000,
    seeders: 200,
    leechers: 10,
    infoHash: '2222222222222222222222222222222222222222',
    sourceId: 'src2'
  };

  const merged = deduplicateSecondary([itemA, itemB]);
  assert.equal(merged.length, 1);
});

test('Secondary Deduplication - keeps items with different file sizes separate', () => {
  const itemA: SearchItem = {
    id: 'a',
    title: 'Linux Kernel Archive',
    category: 'Software',
    sizeBytes: 100000000, // 100MB
    seeders: 10,
    leechers: 1,
    infoHash: '1111111111111111111111111111111111111111',
    sourceId: 'src1'
  };

  const itemB: SearchItem = {
    id: 'b',
    title: 'Linux Kernel Archive',
    category: 'Software',
    sizeBytes: 5000000000, // 5GB (completely different release)
    seeders: 50,
    leechers: 2,
    infoHash: '2222222222222222222222222222222222222222',
    sourceId: 'src2'
  };

  const merged = deduplicateSecondary([itemA, itemB]);
  assert.equal(merged.length, 2);
});
