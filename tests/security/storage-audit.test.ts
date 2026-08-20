import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
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

test('Security Audit - Zero Secrets in Client Storage (INV-08)', () => {
  const storageDir = join(process.cwd(), 'apps/web/src/storage');
  const files = readdirSync(storageDir);

  assert.ok(files.length > 0, 'Storage directory must contain files');

  for (const file of files) {
    const fullPath = join(storageDir, file);
    const content = readFileSync(fullPath, 'utf8').toLowerCase();

    for (const keyword of FORBIDDEN_SECRET_KEYWORDS) {
      assert.ok(
        !content.includes(`"${keyword}"`) && !content.includes(`'${keyword}'`),
        `Security Violation (INV-08): Storage file ${file} references forbidden secret key: ${keyword}`
      );
    }
  }
});
