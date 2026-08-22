/**
 * AATP-R002 verification server: serves the real edge HTML page and answers
 * POST /api/v1/search with the malicious XSS fixture (simulating a compromised
 * upstream that bypassed every server-side gate).
 * Usage: npx tsx tests/fixtures/serve-xss-verify.ts
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { renderFullHtmlPage } from '../../apps/edge/src/html.ts';

const fixture = JSON.parse(
  readFileSync(new URL('./xss-inspector.fixture.json', import.meta.url), 'utf8')
) as { providerFixtureResponse: unknown };

const server = createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderFullHtmlPage());
    return;
  }
  if (req.method === 'POST' && req.url === '/api/v1/search') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fixture.providerFixtureResponse));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: [], errors: ['Not Found'], meta: {} }));
});

server.listen(8787, '127.0.0.1', () => {
  console.log('xss-verify server on http://127.0.0.1:8787');
});
