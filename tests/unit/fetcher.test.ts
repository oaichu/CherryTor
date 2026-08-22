/**
 * AATP-S3 — Mirror failover semantics (FIND-011 + live probe evidence).
 * A mirror that blocks us (403/429), is broken (5xx) or serves an HTML challenge
 * page must fall through to the next mirror; genuine 4xx answers stay terminal.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { safeFetchProvider } from '../../packages/providers/src/fetcher.ts';
import { getProviderConfig } from '../../packages/providers/src/registry.ts';

async function withFetchMock<T>(mock: typeof fetch, fn: () => Promise<T>): Promise<T> {
  const real = globalThis.fetch;
  globalThis.fetch = mock;
  try {
    return await fn();
  } finally {
    globalThis.fetch = real;
  }
}

test('fetcher - 403 on first origin falls through to the next mirror', async () => {
  const config = getProviderConfig('nyaa');
  assert.ok(config);
  let calls = 0;
  const res = await withFetchMock((async () => {
    calls++;
    if (calls === 1) {
      return new Response('forbidden', { status: 403, headers: { 'Content-Type': 'text/plain' } });
    }
    return new Response('<rss/>', { status: 200, headers: { 'Content-Type': 'application/rss+xml' } });
  }) as typeof fetch, () =>
    safeFetchProvider({ config: config!, url: new URL('https://nyaa.si/?page=rss&q=x') }));
  assert.equal(res.status, 200, 'second mirror must be tried after 403');
  assert.equal(calls, 2);
});

test('fetcher - HTML challenge page on first origin falls through to the next mirror', async () => {
  const config = getProviderConfig('nyaa');
  assert.ok(config);
  let calls = 0;
  const res = await withFetchMock((async () => {
    calls++;
    if (calls === 1) {
      return new Response('<html>challenge</html>', { status: 200, headers: { 'Content-Type': 'text/html' } });
    }
    return new Response('<rss/>', { status: 200, headers: { 'Content-Type': 'application/rss+xml' } });
  }) as typeof fetch, () =>
    safeFetchProvider({ config: config!, url: new URL('https://nyaa.si/?page=rss&q=x') }));
  assert.equal(res.status, 200, 'second mirror must be tried after an HTML challenge page');
  assert.equal(calls, 2);
});

test('fetcher - 404 is a genuine answer and stays terminal (no mirror retry)', async () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);
  let calls = 0;
  const res = await withFetchMock((async () => {
    calls++;
    return new Response('[]', { status: 404, headers: { 'Content-Type': 'application/json' } });
  }) as typeof fetch, () =>
    safeFetchProvider({ config: config!, url: new URL('https://apibay.org/q.php?q=x') }));
  assert.equal(res.status, 404, '404 must be returned as-is');
  assert.equal(calls, 1, 'no mirror retry for a genuine 404');
});

test('fetcher - all mirrors blocked surfaces the last error', async () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);
  let calls = 0;
  await assert.rejects(
    withFetchMock((async () => {
      calls++;
      return new Response('forbidden', { status: 403, headers: { 'Content-Type': 'text/plain' } });
    }) as typeof fetch, () =>
      safeFetchProvider({ config: config!, url: new URL('https://apibay.org/q.php?q=x') })),
    /403/
  );
  assert.ok(calls >= 2, 'every mirror must have been tried');
});
