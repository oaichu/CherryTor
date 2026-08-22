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

test('Provider Registry - archive-org adapters stay disabled until real-hash adapter ships (AATP-R003 / FIND-002)', () => {
  // The archive-org adapter fabricates infoHashes by padding identifiers, producing
  // dead magnets flagged as verified. These providers must remain disabled.
  for (const id of ['archive-org', 'archive-org-software', 'archive-org-texts', 'archive-org-audio']) {
    assert.equal(getProviderConfig(id), null, `${id} must be disabled`);
    assert.equal(isApprovedProvider(id), false, `${id} must not be approved`);
  }
  assert.ok(
    listApprovedProviders().every(p => p.adapter !== 'archive-org'),
    'no archive-org adapter provider may be listed as enabled'
  );
});

test('Provider Registry - zero-yield providers stay disabled (AATP-S3, live probe evidence)', () => {
  // acg-rip / bangumi feeds carry no extractable infoHash; fitgirl TLS-fails from
  // worker egress; dodi WordPress RSS has no magnets. All returned 0 items across
  // both latin and CJK probes. Keep disabled until a working endpoint is verified.
  for (const id of ['acg-rip', 'bangumi', 'fitgirl', 'dodi']) {
    assert.equal(getProviderConfig(id), null, `${id} must be disabled`);
  }
});

test('Provider Registry - firehose providers are flagged for server-side relevance filtering (AATP-S1)', () => {
  // apibay returns unrelated latest uploads for CJK queries; eztv keywords and
  // linuxtracker rss search params are ignored — all must be relevance-filtered.
  for (const id of ['apibay', 'eztv', 'linuxtracker']) {
    const config = getProviderConfig(id);
    assert.ok(config, `${id} must be enabled`);
    assert.equal(config!.unfilteredSearch, true, `${id} must be flagged unfilteredSearch`);
  }
  // Real server-side search providers must NOT be flagged.
  for (const id of ['dmhy', 'nyaa', 'bitsearch', 'solidtorrents']) {
    const config = getProviderConfig(id);
    assert.ok(config, `${id} must be enabled`);
    assert.notEqual(config!.unfilteredSearch, true, `${id} performs real server-side search`);
  }
});

test('Provider Registry - solidtorrents allows its bitsearch.eu redirect host (AATP-S3)', () => {
  const config = getProviderConfig('solidtorrents');
  assert.ok(config);
  assert.ok(config!.allowedRedirectHosts.includes('bitsearch.eu'));
});

test('Provider Registry - yts allows its real yts.gg domain migration', () => {
  // Live probe: yts.mx currently 301s to yts.gg (genuine domain migration, not a
  // malicious redirect) — allowlisted so the provider stays usable.
  const config = getProviderConfig('yts');
  assert.ok(config);
  assert.ok(config!.allowedRedirectHosts.includes('yts.gg'));
});
