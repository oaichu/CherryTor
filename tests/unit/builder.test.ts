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
