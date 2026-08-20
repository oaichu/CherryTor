import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSearchItem, validateProviderSearchQuery } from '../../packages/schemas/src/validate.ts';

test('validateSearchItem - accepts valid item', () => {
  const valid = {
    id: 'item-1',
    title: 'Ubuntu 24.04 LTS Desktop',
    category: 'Software',
    sizeBytes: 6144000000,
    seeders: 3400,
    leechers: 120,
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    magnetUri: 'magnet:?xt=urn:btih:2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'canonical-releases',
    publishedAt: '2026-08-10T08:00:00Z'
  };

  const result = validateSearchItem(valid);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.title, 'Ubuntu 24.04 LTS Desktop');
    assert.equal(result.value.infoHash, '2b9e19d8463e264ef81c81ef40d41d1a1ecde012');
  }
});

test('validateSearchItem - rejects negative seeders', () => {
  const invalid = {
    id: 'item-2',
    title: 'Malicious Swarm Item',
    category: 'Software',
    sizeBytes: 1000,
    seeders: -5,
    leechers: 0,
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'test'
  };

  const result = validateSearchItem(invalid);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.some(e => e.includes('seeders')));
  }
});

test('validateSearchItem - rejects missing title or 2GB title overflow', () => {
  const missingTitle = {
    id: 'item-3',
    title: '',
    category: 'Movies',
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'test'
  };
  assert.equal(validateSearchItem(missingTitle).ok, false);

  const overflowTitle = {
    id: 'item-4',
    title: 'A'.repeat(501),
    category: 'Movies',
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'test'
  };
  assert.equal(validateSearchItem(overflowTitle).ok, false);
});

test('validateSearchItem - rejects invalid infoHash', () => {
  const badHash = {
    id: 'item-5',
    title: 'Valid Title',
    category: 'Movies',
    infoHash: 'invalid-non-hex-hash-1234',
    sourceId: 'test'
  };
  assert.equal(validateSearchItem(badHash).ok, false);
});

test('validateProviderSearchQuery - accepts valid query and rejects malicious/empty queries', () => {
  const valid = { provider: 'canonical-releases', query: 'ubuntu' };
  assert.equal(validateProviderSearchQuery(valid).ok, true);

  const empty = { provider: 'canonical-releases', query: '' };
  assert.equal(validateProviderSearchQuery(empty).ok, false);

  const overflow = { provider: 'canonical-releases', query: 'x'.repeat(201) };
  assert.equal(validateProviderSearchQuery(overflow).ok, false);
});
