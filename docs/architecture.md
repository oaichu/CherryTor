# CHERRYTOR SYSTEM ARCHITECTURE

## 1. System Topology & Trust Boundaries

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ BROWSER CLIENT (apps/web)                                              │
│ - UI (Retro Terminal / CRT) strictly consumes design/tokens-v1.json     │
│ - Search Dispatcher (Incremental batch rendering)                       │
│ - Safe Text Renderer (0 innerHTML, strict textContent)                  │
│ - Magnet Parser & Validator (RFC BTIH entropy check)                    │
│ - IndexedDB Cache (No credentials, TTL-bound metadata only)             │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Structured JSON Query
                                     │ { "provider": "alpha", "query": "ubuntu" }
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ EDGE API GATEWAY (apps/edge - Cloudflare Worker)                        │
│ - Route: POST /api/v1/search (NO ?target= or arbitrary url parameters)   │
│ - Provider Registry: Hardcoded server-side approved origins             │
│ - Fixed URL Builder: Prevents hostname escaping & path traversal        │
│ - Strict Upstream Fetch: Clean headers, manual redirect validation      │
│ - Response Content-Type: application/json or application/xml only       │
│ - Response Size Guard: Max 2MB per provider payload                     │
│ - Timeout & Circuit Breaker: Fail-fast, isolated provider failures      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Upstream Request
                                     │ (Controlled template URL)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ APPROVED UPSTREAM PROVIDERS (Canonical Feeds)                           │
│ - Canonical OS Feeds (Ubuntu, Debian, Arch mirrors)                     │
│ - Open Creative Media (Blender, Archive.org)                            │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2. Invariants & Security Contract
1. **INV-01**: Client never sends arbitrary target URLs to Edge.
2. **INV-02**: Edge never operates as a generic HTTP proxy.
3. **INV-03**: Upstream URLs generated strictly from Server-Side Registry.
4. **INV-04**: Upstream response never raw-relayed to browser.
5. **INV-05**: Production Edge API returns structured `application/json` only.
6. **INV-06**: No CAPTCHA/WAF bypass mechanisms.
7. **INV-07**: Zero arbitrary Browser-to-LAN RPC in web frontend (qBittorrent/aria2 out-of-scope for V1).
8. **INV-08**: Zero persistent credentials/secrets in browser storage.
9. **INV-09**: P2P stream engine completely isolated outside search security boundary.
10. **INV-10**: Unreviewed upstream providers are disabled by default.
