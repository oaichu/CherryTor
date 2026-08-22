/**
 * AATP-R001 — Strict magnet URI gate at schema boundary (FIND-001 root fix)
 * Regression tests for XSS payloads smuggled through magnetUri.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSearchItem } from '../../packages/schemas/src/validate.ts';

const VALID_HASH = '2b9e19d8463e264ef81c81ef40d41d1a1ecde012';
const VALID_BASE32 = '4F7NZYMA4GN3YDT4NQU3N3I6RHIXP3LZ';

function makeItem(overrides: Record<string, unknown> = {}) {
  return {
    id: 'item-xss-1',
    title: 'Ubuntu 24.04 LTS Desktop',
    category: 'Software',
    sizeBytes: 6144000000,
    seeders: 3400,
    leechers: 120,
    infoHash: VALID_HASH,
    sourceId: 'test-provider',
    publishedAt: '2026-08-10T08:00:00Z',
    ...overrides
  };
}

test('magnet gate - accepts bare 40-hex magnet', () => {
  const res = validateSearchItem(makeItem({ magnetUri: `magnet:?xt=urn:btih:${VALID_HASH}` }));
  assert.equal(res.ok, true);
});

test('magnet gate - accepts 32-base32 magnet with percent-encoded params', () => {
  const magnet = `magnet:?xt=urn:btih:${VALID_BASE32}&dn=Ubuntu+Desktop&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce`;
  const res = validateSearchItem(makeItem({ magnetUri: magnet, infoHash: VALID_BASE32 }));
  assert.equal(res.ok, true);
});

test('magnet gate - rejects double-quote attribute breakout payload', () => {
  const magnet = `magnet:?xt=urn:btih:${VALID_HASH}" onmouseover="alert(1)`;
  const res = validateSearchItem(makeItem({ magnetUri: magnet }));
  assert.equal(res.ok, false);
});

test('magnet gate - rejects HTML tag injection in dn param', () => {
  const magnet = `magnet:?xt=urn:btih:${VALID_HASH}&dn=<img src=x onerror=alert(1)>`;
  const res = validateSearchItem(makeItem({ magnetUri: magnet }));
  assert.equal(res.ok, false);
});

test('magnet gate - rejects single quote, backtick, angle bracket and whitespace payloads', () => {
  const payloads = [
    `magnet:?xt=urn:btih:${VALID_HASH}&dn='x'`,
    `magnet:?xt=urn:btih:${VALID_HASH}\`x`,
    `magnet:?xt=urn:btih:${VALID_HASH}&dn=a>b`,
    `magnet:?xt=urn:btih:${VALID_HASH} &tr=x`
  ];
  for (const magnet of payloads) {
    assert.equal(validateSearchItem(makeItem({ magnetUri: magnet })).ok, false, `payload not rejected: ${magnet}`);
  }
});

test('magnet gate - rejects malformed hash after btih prefix', () => {
  const res = validateSearchItem(makeItem({ magnetUri: 'magnet:?xt=urn:btih:short_hash' }));
  assert.equal(res.ok, false);
});

test('magnet gate - rejects non-btih xt urn (e.g. ed2k)', () => {
  const res = validateSearchItem(makeItem({ magnetUri: `magnet:?xt=urn:ed2k:${VALID_HASH}` }));
  assert.equal(res.ok, false);
});

test('magnet gate - rejects magnet URI longer than 2048 chars', () => {
  const magnet = `magnet:?xt=urn:btih:${VALID_HASH}&dn=${'a'.repeat(2100)}`;
  const res = validateSearchItem(makeItem({ magnetUri: magnet }));
  assert.equal(res.ok, false);
});
