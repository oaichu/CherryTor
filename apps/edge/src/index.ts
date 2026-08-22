import { handleSearchApiRequest } from './router.ts';
import { renderFullHtmlPage } from './html.ts';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Global Anti-Proxy Guard (INV-01, INV-02)
    if (url.searchParams.has('target') || url.searchParams.has('url') || url.pathname.includes('/proxy')) {
      return new Response(
        JSON.stringify({
          data: [],
          errors: ['[INV-02_VIOLATION] Arbitrary proxy and ?target= requests are strictly forbidden'],
          meta: { provider: 'unknown', latencyMs: 0, timestamp: new Date().toISOString() }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Serve Full Web UI at Root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(renderFullHtmlPage(), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
          // AATP-D3 (FIND-010): deny-by-default CSP. The page is a single inline
          // document; its only external resources are Google Fonts stylesheets.
          'Content-Security-Policy':
            "default-src 'none'; script-src 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'no-referrer'
        }
      });
    }

    if (url.pathname === '/api/v1/search') {
      return handleSearchApiRequest(request);
    }

    if (url.pathname === '/healthz') {
      return new Response(JSON.stringify({ status: 'ok', time: new Date().toISOString() }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(
      JSON.stringify({
        data: [],
        errors: ['Not Found'],
        meta: { provider: 'edge', latencyMs: 0, timestamp: new Date().toISOString() }
      }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
