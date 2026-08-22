/**
 * AATP-R006 — Adapters must not fabricate swarm counts or publish dates.
 * When upstream data is missing, items carry null seeders/leechers and no
 * publishedAt — never invented values (FIND-003).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProviderResponse } from '../../packages/providers/src/parser.ts';
import { parseRssXmlFeed } from '../../packages/providers/src/xml-adapter.ts';
import { getProviderConfig } from '../../packages/providers/src/registry.ts';

const HASH = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

function jsonResponse(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

test('YTS adapter - missing seeds/peers/date yield null swarm and no publishedAt', async () => {
  const config = getProviderConfig('yts');
  assert.ok(config);
  const items = await parseProviderResponse(config!, jsonResponse({
    data: { movies: [{ title_long: 'Test Movie', torrents: [{ hash: HASH, quality: '1080p', size_bytes: 123456789 }] }] }
  }));
  assert.equal(items.length, 1);
  assert.equal(items[0]?.seeders, null, 'seeders must be null, not invented');
  assert.equal(items[0]?.leechers, null, 'leechers must be null, not invented');
  assert.equal(items[0]?.publishedAt, undefined, 'publishedAt must be absent, not "now"');
});

test('EZTV adapter - missing seeds/peers yield null swarm and no publishedAt', async () => {
  const config = getProviderConfig('eztv');
  assert.ok(config);
  const items = await parseProviderResponse(config!, jsonResponse({
    torrents: [{ hash: HASH, title: 'Show S01E01', size_bytes: 100 }]
  }));
  assert.equal(items.length, 1);
  assert.equal(items[0]?.seeders, null, 'seeders must be null, not invented');
  assert.equal(items[0]?.leechers, null, 'leechers must be null, not invented');
  assert.equal(items[0]?.publishedAt, undefined, 'publishedAt must be absent, not "now"');
});

test('SolidTorrents adapter - missing swarm/imported yield nulls and no publishedAt', async () => {
  const config = getProviderConfig('solidtorrents');
  assert.ok(config);
  const items = await parseProviderResponse(config!, jsonResponse({
    results: [{ infoHash: HASH, title: 'DHT Item', size: 500 }]
  }));
  assert.equal(items.length, 1);
  assert.equal(items[0]?.seeders, null, 'seeders must be null, not invented');
  assert.equal(items[0]?.leechers, null, 'leechers must be null, not invented');
  assert.equal(items[0]?.publishedAt, undefined, 'publishedAt must be absent, not "now"');
});

test('apibay adapter - missing added timestamp yields no publishedAt', async () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);
  const items = await parseProviderResponse(config!, jsonResponse([
    { name: 'Some Release', info_hash: HASH, size: '123' }
  ]));
  assert.equal(items.length, 1);
  assert.equal(items[0]?.publishedAt, undefined, 'publishedAt must be absent, not "now"');
});

test('SolidTorrents-compatible adapter - parses bitsearch.eu shape (AATP-S2)', async () => {
  const config = getProviderConfig('bitsearch');
  assert.ok(config, 'bitsearch must be registered and enabled');
  const items = await parseProviderResponse(config!, jsonResponse({
    success: true,
    query: 'avatar',
    results: [{
      id: '6945ff147eef467b744c16e1',
      infohash: '5CA4F8AAE8EC1F422F9AAD23908C94297C2CB882',
      title: 'Avatar Fire and Ash (2025) 1080p DVDScr - x264 - AAC - 3GB.mkv',
      size: 3300467929,
      category: 1,
      seeders: 2461,
      leechers: 1066,
      createdAt: '2025-12-20T01:42:44.819Z'
    }]
  }));
  assert.equal(items.length, 1);
  assert.equal(items[0]?.infoHash, '5ca4f8aae8ec1f422f9aad23908c94297c2cb882');
  assert.equal(items[0]?.seeders, 2461, 'top-level seeders must be read');
  assert.equal(items[0]?.leechers, 1066, 'top-level leechers must be read');
  assert.equal(items[0]?.sizeBytes, 3300467929);
  assert.equal(items[0]?.publishedAt, '2025-12-20T01:42:44.819Z', 'createdAt must map to publishedAt');
  assert.ok(items[0]?.magnetUri?.startsWith('magnet:?xt=urn:btih:5ca4f8aa'));
});

test('parser - rejects oversized payloads via Content-Length before body read (AATP-D1 / FIND-006)', async () => {
  const config = getProviderConfig('apibay');
  assert.ok(config);
  const oversized = new Response('[]', {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Content-Length': String(config!.maxPayloadBytes + 1) }
  });
  await assert.rejects(
    () => parseProviderResponse(config!, oversized),
    /exceeds maximum allowed size/
  );
});

test('RSS adapter - missing nyaa:seeders/pubDate yield null swarm and no publishedAt', () => {
  const rss = `
    <rss version="2.0"><channel><title>Feed</title>
      <item>
        <title>Untitled Batch Release</title>
        <link>magnet:?xt=urn:btih:${HASH}&amp;dn=Batch</link>
      </item>
    </channel></rss>
  `;
  const items = parseRssXmlFeed(rss, 'nyaa', 'Other');
  assert.equal(items.length, 1);
  assert.equal(items[0]?.seeders, null, 'seeders must be null, not invented 10');
  assert.equal(items[0]?.leechers, null, 'leechers must be null, not invented 1');
  assert.equal(items[0]?.publishedAt, undefined, 'publishedAt must be absent, not "now"');
});
