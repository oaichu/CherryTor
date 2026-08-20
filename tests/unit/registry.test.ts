import test from 'node:test';
import assert from 'node:assert/strict';
import { getProviderConfig, listApprovedProviders, isApprovedProvider } from '../../packages/providers/src/registry.ts';

test('Provider Registry - allows approved providers', () => {
  const ubuntu = getProviderConfig('canonical-releases');
  assert.ok(ubuntu);
  assert.equal(ubuntu?.origin, 'https://torrent.ubuntu.com');
  assert.equal(isApprovedProvider('canonical-releases'), true);
});

test('Provider Registry - rejects unapproved / arbitrary hostnames', () => {
  assert.equal(getProviderConfig('evil-provider'), null);
  assert.equal(getProviderConfig('https://evil.com'), null);
  assert.equal(getProviderConfig('localhost'), null);
  assert.equal(isApprovedProvider('http://127.0.0.1'), false);
});

test('Provider Registry - listApprovedProviders returns all enabled entries', () => {
  const list = listApprovedProviders();
  assert.ok(list.length >= 4);
  assert.ok(list.every(p => p.origin.startsWith('https://')));
});
