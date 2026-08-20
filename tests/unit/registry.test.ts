import test from 'node:test';
import assert from 'node:assert/strict';
import { getProviderConfig, listApprovedProviders, isApprovedProvider } from '../../packages/providers/src/registry.ts';

test('Provider Registry - allows approved providers', () => {
  const apibay = getProviderConfig('apibay');
  assert.ok(apibay);
  assert.equal(apibay?.origin, 'https://apibay.org');
  assert.equal(isApprovedProvider('apibay'), true);

  const dmhy = getProviderConfig('dmhy');
  assert.ok(dmhy);
  assert.equal(isApprovedProvider('dmhy'), true);
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
