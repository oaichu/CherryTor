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

test('Edge Worker - firehose provider results are relevance-filtered server-side (AATP-S1 / FIND-016)', async () => {
  const realFetch = globalThis.fetch;
  // EZTV ignores its keywords param: returns latest uploads unrelated to the query.
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({
      torrents: [
        { hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', title: 'Diarra From Detroit S02E05 720p WEB h264-DiRT EZTV', size_bytes: 1 },
        { hash: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', title: 'Avatar.The.Last.Airbender.2026.1080p.WEBRip', size_bytes: 2 }
      ]
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })) as typeof fetch;
  try {
    const postSearch = (body: unknown) =>
      worker.fetch(new Request('https://edge.cherrytor.local/api/v1/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }));

    const res = await postSearch({ provider: 'eztv', query: 'avatar' });
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.data.length, 1, 'unrelated firehose items must be dropped');
    assert.ok(json.data[0].title.startsWith('Avatar'));
  } finally {
    globalThis.fetch = realFetch;
  }
});

test('Edge Worker - client-caused validation errors must NOT open the circuit breaker (AATP-R005 / FIND-005)', async () => {
  // 12 chars pass the schema length check, but NFKC normalization expands each
  // U+FDFA to 18 chars (216 total) → normalizeAndValidateQuery throws ValidationError.
  const nfkcBomb = '\uFDFA'.repeat(12);

  const postSearch = (body: unknown) =>
    worker.fetch(
      new Request('https://edge.cherrytor.local/api/v1/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    );

  // Exceed the circuit-breaker failure threshold (3) with client-caused 400s.
  for (let i = 0; i < 3; i++) {
    const res = await postSearch({ provider: 'apibay', query: nfkcBomb });
    assert.equal(res.status, 400, `request ${i + 1} must be a validation 400`);
  }

  // A 4th client-caused validation error must STILL be 400 — if these errors
  // counted toward the breaker, this would return 502 circuit-breaker-open.
  const fourth = await postSearch({ provider: 'apibay', query: nfkcBomb });
  assert.equal(fourth.status, 400, 'validation errors must not trip the circuit breaker');
  const fourthJson = await fourth.json();
  assert.ok(!JSON.stringify(fourthJson).includes('circuit breaker'), 'breaker must remain CLOSED');

  // The provider must remain usable: stub upstream fetch and run a valid query.
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } })) as typeof fetch;
  try {
    const res = await postSearch({ provider: 'apibay', query: 'ubuntu' });
    assert.equal(res.status, 200, 'breaker must be CLOSED for a valid request');
    const json = await res.json();
    assert.equal(json.errors.length, 0);
  } finally {
    globalThis.fetch = realFetch;
  }
});
