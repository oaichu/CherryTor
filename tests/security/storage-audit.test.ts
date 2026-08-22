import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const FORBIDDEN_SECRET_KEYWORDS = [
  'password',
  'secret',
  'api_key',
  'apikey',
  'auth_token',
  'authtoken',
  'qbittorrent_pass',
  'aria2_secret',
  'private_key'
];

test('Security Audit - Zero Secrets in Served UI Client Storage (INV-08)', () => {
  // The production page is the inline UI served from apps/edge/src/html.ts.
  // Its entire client-persistence surface is localStorage; audit every key it
  // touches for forbidden credential-like names.
  const htmlPath = join(process.cwd(), 'apps/edge/src/html.ts');
  const source = readFileSync(htmlPath, 'utf8');

  const storageCalls = source.match(/localStorage\.(get|set|remove)Item\(\s*['"]([^'"]+)['"]/g) || [];
  const keys = new Set<string>();
  for (const call of storageCalls) {
    const match = call.match(/['"]([^'"]+)['"]$/);
    if (match && match[1] !== undefined) {
      keys.add(match[1]);
    }
  }

  assert.ok(keys.size > 0, 'served UI is expected to use localStorage (bookmarks, settings)');

  for (const key of keys) {
    const lowerKey = key.toLowerCase();
    for (const keyword of FORBIDDEN_SECRET_KEYWORDS) {
      assert.ok(
        !lowerKey.includes(keyword),
        `Security Violation (INV-08): served UI touches localStorage key '${key}' containing forbidden secret keyword: ${keyword}`
      );
    }
  }
});
