import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAndValidateMagnet } from '../../packages/core/src/magnet.ts';

test('Magnet Parser - validates correct RFC magnet link with 40-char hex', () => {
  const uri = 'magnet:?xt=urn:btih:2b9e19d8463e264ef81c81ef40d41d1a1ecde012&dn=Ubuntu+Desktop&tr=https%3A%2F%2Ftorrent.ubuntu.com%2Fannounce';
  const parsed = parseAndValidateMagnet(uri);
  assert.equal(parsed.valid, true);
  assert.equal(parsed.infoHash, '2b9e19d8463e264ef81c81ef40d41d1a1ecde012');
  assert.equal(parsed.displayName, 'Ubuntu Desktop');
  assert.equal(parsed.trackers.length, 1);
});

test('Magnet Parser - rejects dangerous non-magnet schemes (AATP-0506)', () => {
  assert.throws(() => parseAndValidateMagnet('javascript:alert(1)'), /Dangerous/);
  assert.throws(() => parseAndValidateMagnet('data:text/html,<script>alert(1)</script>'), /Dangerous/);
  assert.throws(() => parseAndValidateMagnet('file:///etc/passwd'), /Dangerous/);
  assert.throws(() => parseAndValidateMagnet('https://evil.com/torrent.torrent'), /Dangerous/);
});

test('Magnet Parser - rejects malformed or invalid hash entropy', () => {
  assert.throws(() => parseAndValidateMagnet('magnet:?dn=MissingXt'), /missing required xt/);
  assert.throws(() => parseAndValidateMagnet('magnet:?xt=urn:btih:short_hash'), /entropy/);
  assert.throws(() => parseAndValidateMagnet('magnet:?xt=urn:ed2k:354e1b0'), /missing required xt/);
});
