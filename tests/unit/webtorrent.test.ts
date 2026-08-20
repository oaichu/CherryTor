import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateStreamCompatibility,
  detectBrowserP2PCapabilities,
  P2P_PRIVACY_DISCLOSURE_TEXT
} from '../../packages/core/src/webtorrent-capability.ts';

test('WebTorrent - evaluates stream compatibility based on tracker protocols and category', () => {
  const mediaWithWs = evaluateStreamCompatibility('Movies', ['wss://tracker.openwebtorrent.com:443/announce']);
  assert.equal(mediaWithWs, 'WEB_STREAM_POSSIBLE');

  const mediaWithoutWs = evaluateStreamCompatibility('Movies', ['udp://tracker.opentrackr.org:1337/announce']);
  assert.equal(mediaWithoutWs, 'UNKNOWN');

  const software = evaluateStreamCompatibility('Software', ['wss://tracker.openwebtorrent.com:443/announce']);
  assert.equal(software, 'EXTERNAL_CLIENT_RECOMMENDED');
});

test('WebTorrent - includes mandatory P2P privacy disclosure warning (INV-09)', () => {
  assert.ok(P2P_PRIVACY_DISCLOSURE_TEXT.includes('INV-09'));
  assert.ok(P2P_PRIVACY_DISCLOSURE_TEXT.includes('IP address'));
});

test('WebTorrent - detectBrowserP2PCapabilities returns capability object structure', () => {
  const caps = detectBrowserP2PCapabilities();
  assert.ok('supported' in caps);
  assert.ok('hasWebRTC' in caps);
});
