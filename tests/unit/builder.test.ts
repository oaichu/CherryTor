import test from 'node:test';
import assert from 'node:assert/strict';
import { getProviderConfig } from '../../packages/providers/src/registry.ts';
import { buildProviderUrl } from '../../packages/providers/src/builder.ts';

test('URL Builder - generates valid HTTPS URL with encoded query', () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);

  const url = buildProviderUrl(config!, 'ubuntu 24.04 lts');
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'apibay.org');
  assert.equal(url.pathname, '/q.php');
  assert.equal(url.searchParams.get('q'), 'ubuntu 24.04 lts');
});

test('URL Builder - prevents arbitrary hostname injection attempts', () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);

  const attacks = [
    'https://evil.com',
    '//evil.com',
    '%2f%2fevil.com',
    '@evil.com/test',
    '../../etc/passwd'
  ];

  for (const attack of attacks) {
    const url = buildProviderUrl(config!, attack);
    assert.equal(url.hostname, 'apibay.org', `Failed to lock hostname against attack: ${attack}`);
  }
});

test('URL Builder - maps category to provider categoryParam (AATP-S4, apibay)', () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);

  const video = buildProviderUrl(config!, 'avatar', 'Movies');
  assert.equal(video.searchParams.get('cat'), '200', 'Movies must map to apibay cat=200');

  const tv = buildProviderUrl(config!, 'avatar', 'TV');
  assert.equal(tv.searchParams.get('cat'), '200', 'TV must map to apibay cat=200');

  const games = buildProviderUrl(config!, 'avatar', 'Games');
  assert.equal(games.searchParams.get('cat'), '400', 'Games must map to apibay cat=400');

  const all = buildProviderUrl(config!, 'avatar', 'ALL');
  assert.equal(all.searchParams.get('cat'), null, 'ALL must not pin a category');

  const books = buildProviderUrl(config!, 'avatar', 'Books');
  assert.equal(books.searchParams.get('cat'), null, 'Books has no usable apibay parent category');
});

test('URL Builder - providers without categoryParam stay untouched (AATP-S4)', () => {
  const config = getProviderConfig('dmhy');
  assert.ok(config);
  const url = buildProviderUrl(config!, 'avatar', 'Movies');
  assert.equal(url.searchParams.get('cat'), null);
  assert.equal(url.searchParams.has('keyword'), true);
});
