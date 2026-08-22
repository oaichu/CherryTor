import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../apps/edge/src/index.ts';
import { isApprovedProvider } from '../../packages/providers/src/registry.ts';
import { validateSearchItem } from '../../packages/schemas/src/validate.ts';

test('INV-01 & INV-02: Edge rejects arbitrary ?target= and /proxy endpoints', async () => {
  const targetReq = new Request('https://edge.cherrytor.local/api/v1/search?target=https://malicious.org', {
    method: 'GET'
  });
  const res1 = await worker.fetch(targetReq);
  assert.equal(res1.status, 400);

  const proxyReq = new Request('https://edge.cherrytor.local/proxy?url=https://malicious.org', {
    method: 'GET'
  });
  const res2 = await worker.fetch(proxyReq);
  assert.equal(res2.status, 400);
});

test('INV-03 & INV-10: Upstream URLs strictly from registry; unreviewed providers rejected', () => {
  assert.equal(isApprovedProvider('unreviewed_random_host'), false);
  assert.equal(isApprovedProvider('https://piratebay.org'), false);
});

test('INV-06 scope note + magnet gate: dangerous schemes never reach the client', () => {
  // The strict magnet gate lives in packages/schemas/validate.ts (AATP-R001).
  // Any magnetUri that is not a strictly well-formed btih magnet is rejected
  // at the edge boundary — javascript:/data:/file: payloads can never pass.
  const base = {
    id: 'inv6', title: 'Ubuntu 24.04', category: 'Software' as const,
    infoHash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', sourceId: 'test'
  };
  assert.equal(validateSearchItem({ ...base, magnetUri: 'javascript:alert(1)' }).ok, false);
  assert.equal(validateSearchItem({ ...base, magnetUri: 'data:text/html,<script>alert(1)</script>' }).ok, false);
  assert.equal(
    validateSearchItem({ ...base, magnetUri: `magnet:?xt=urn:btih:${'a'.repeat(40)}` }).ok,
    true
  );
});

test('INV-05: API production returns structured application/json only', async () => {
  const req = new Request('https://edge.cherrytor.local/api/v1/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'canonical-releases', query: 'ubuntu' })
  });

  const res = await worker.fetch(req);
  const contentType = res.headers.get('Content-Type') || '';
  assert.ok(contentType.includes('application/json'));
});
