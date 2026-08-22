/**
 * AATP-S1 — Relevance gate for firehose providers (FIND-016).
 * EZTV / LinuxTracker ignore their search parameter and return their latest
 * uploads regardless of query; these token filters keep such noise out.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { tokenizeQuery, filterRelevantItems } from '../../packages/core/src/relevance.ts';

test('tokenizeQuery - splits on non-alphanumerics and lowercases', () => {
  assert.deepEqual(tokenizeQuery('Avatar: The Way of Water'), ['avatar', 'the', 'way', 'of', 'water']);
});

test('tokenizeQuery - keeps CJK tokens intact', () => {
  assert.deepEqual(tokenizeQuery('鬼滅の刃 1080p'), ['鬼滅の刃', '1080p']);
});

test('tokenizeQuery - drops 1-char noise tokens', () => {
  assert.deepEqual(tokenizeQuery('a 1 ubuntu'), ['ubuntu']);
});

test('filterRelevantItems - keeps only titles containing a query token', () => {
  const items = [
    { title: 'Avatar.The.Last.Airbender.2026.1080p' },
    { title: 'Diarra From Detroit S02E05 720p WEB h264-DiRT EZTV' },
    { title: '[TORRENT] TrueNAS-26.0.0-BETA.3.iso' }
  ];
  const out = filterRelevantItems(items, tokenizeQuery('avatar'));
  assert.equal(out.length, 1);
  assert.equal(out[0]?.title.startsWith('Avatar'), true);
});

test('filterRelevantItems - empty token list returns items unchanged (real-search providers)', () => {
  const items = [{ title: 'anything' }];
  assert.deepEqual(filterRelevantItems(items, []), items);
});

test('filterRelevantItems - CJK query matches CJK titles', () => {
  const items = [
    { title: '[SubsPlease] 鬼滅の刃 - 47 [1080p].mkv' },
    { title: 'Completely Unrelated Episode' }
  ];
  const out = filterRelevantItems(items, tokenizeQuery('鬼滅の刃'));
  assert.equal(out.length, 1);
  assert.ok(out[0]?.title.includes('鬼滅の刃'));
});
