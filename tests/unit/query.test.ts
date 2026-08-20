import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAndValidateQuery } from '../../packages/core/src/query.ts';

test('Query Normalizer - cleans whitespace and applies NFKC normalization', () => {
  const input = '  ubuntu  \u200B\uFEFF24.04  ';
  const clean = normalizeAndValidateQuery(input);
  assert.equal(clean, 'ubuntu  24.04');
});

test('Query Normalizer - rejects empty and oversized queries', () => {
  assert.throws(() => normalizeAndValidateQuery('   '), /empty/);
  assert.throws(() => normalizeAndValidateQuery('a'.repeat(201)), /maximum limit/);
});
