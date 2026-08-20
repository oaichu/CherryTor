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
          'X-Content-Type-Options': 'nosniff'
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
