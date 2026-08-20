import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../apps/edge/src/index.ts';

test('Edge Worker - rejects arbitrary ?target= proxy attempts (INV-01, INV-02)', async () => {
  const req = new Request('https://edge.cherrytor.local/api/v1/search?target=https://evil.com', {
    method: 'GET'
  });

  const res = await worker.fetch(req);
  assert.equal(res.status, 400);

  const json = await res.json();
  assert.ok(json.errors[0].includes('INV-02_VIOLATION'));
});

test('Edge Worker - rejects GET request on search endpoint (Method Not Allowed)', async () => {
  const req = new Request('https://edge.cherrytor.local/api/v1/search', {
    method: 'GET'
  });

  const res = await worker.fetch(req);
  assert.equal(res.status, 405);
});

test('Edge Worker - rejects unapproved provider IDs with 400 Bad Request', async () => {
  const req = new Request('https://edge.cherrytor.local/api/v1/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'https://evil.com', query: 'ubuntu' })
  });

  const res = await worker.fetch(req);
  assert.equal(res.status, 400);

  const json = await res.json();
  assert.ok(json.errors.length > 0);
});

test('Edge Worker - health check returns 200 OK', async () => {
  const req = new Request('https://edge.cherrytor.local/healthz');
  const res = await worker.fetch(req);
  assert.equal(res.status, 200);

  const json = await res.json();
  assert.equal(json.status, 'ok');
});
