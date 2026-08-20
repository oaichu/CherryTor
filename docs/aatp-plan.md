# MASTER AATP EXECUTION PLAN — CHERRYTOR V1.0

Every task in this plan complies with the hard constraints:
- **Max Files**: $\le 5$ files
- **Max Diff**: $\le 200$ lines
- **Acceptance**: Runnable test or command check
- **Forbidden Paths**: Specified for isolation

---

## Phase 1 — Monorepo & Application Foundation

### AATP-0101 — Workspace & Monorepo Bootstrap
- **Goal**: Establish pnpm workspace structure and root TypeScript configuration.
- **Files allowed**: `package.json`, `pnpm-workspace.yaml`, `tsconfig.json`, `packages/schemas/package.json`, `packages/core/package.json`
- **Max diff**: $\le 150$ lines
- **Acceptance**: `pnpm install` succeeds and workspace packages resolve correctly.
- **Forbidden paths**: `apps/*`, `design/*`
- **Depends on**: None

### AATP-0102 — TypeScript Strict Baseline
- **Goal**: Enforce strict TypeScript compiler flags (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- **Files allowed**: `tsconfig.json`, `packages/core/tsconfig.json`, `packages/schemas/tsconfig.json`
- **Max diff**: $\le 80$ lines
- **Acceptance**: `pnpm tsc --noEmit` exits with code 0.
- **Forbidden paths**: `apps/*`
- **Depends on**: `AATP-0101`

### AATP-0103 — Canonical SearchItem & Metadata Schemas
- **Goal**: Define canonical TypeScript interfaces for `SearchItem`, `Category`, and `RankingSignals`.
- **Files allowed**: `packages/schemas/src/item.ts`, `packages/schemas/src/index.ts`, `packages/schemas/tsconfig.json`
- **Max diff**: $\le 120$ lines
- **Acceptance**: Unit test verifies valid `SearchItem` object typing.
- **Forbidden paths**: `apps/*`, `packages/providers/*`
- **Depends on**: `AATP-0102`

### AATP-0104 — Runtime Schema Validation
- **Goal**: Implement runtime schema validator rejecting malformed, negative seeders, or oversized payloads.
- **Files allowed**: `packages/schemas/src/validate.ts`, `packages/schemas/src/index.ts`, `tests/unit/validate.test.ts`
- **Max diff**: $\le 160$ lines
- **Acceptance**: `pnpm test tests/unit/validate.test.ts` passes 100% on malicious fixtures.
- **Forbidden paths**: `apps/*`
- **Depends on**: `AATP-0103`

### AATP-0105 — Unified Gateway Error Taxonomy
- **Goal**: Create standardized error types (`ProviderTimeout`, `ProviderBadResponse`, `ValidationError`, `RateLimited`).
- **Files allowed**: `packages/core/src/errors.ts`, `packages/core/src/index.ts`, `tests/unit/errors.test.ts`
- **Max diff**: $\le 110$ lines
- **Acceptance**: `pnpm test tests/unit/errors.test.ts` passes.
- **Forbidden paths**: `apps/*`
- **Depends on**: `AATP-0104`

---

## Phase 2 — Edge Gateway Security & Provider Registry

### AATP-0201 — Provider Registry & Origin Allowlist
- **Goal**: Create static server-side registry mapping approved provider IDs to strict HTTPS origins.
- **Files allowed**: `packages/providers/src/registry.ts`, `packages/providers/src/types.ts`, `packages/providers/src/index.ts`, `tests/unit/registry.test.ts`
- **Max diff**: $\le 140$ lines
- **Acceptance**: Unknown or unapproved provider IDs throw `ValidationError` or return 400.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0105`

### AATP-0202 — Fixed URL Builder (No Raw Concat)
- **Goal**: Build URL generator preventing arbitrary target injection, `@hostname` tricks, and path escaping.
- **Files allowed**: `packages/providers/src/builder.ts`, `packages/providers/src/index.ts`, `tests/unit/builder.test.ts`
- **Max diff**: $\le 130$ lines
- **Acceptance**: `pnpm test tests/unit/builder.test.ts` confirms query cannot alter final hostname.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0201`

### AATP-0203 — Query Length & Normalization Validator
- **Goal**: Validate search query (1–200 chars, strip dangerous control characters).
- **Files allowed**: `packages/core/src/query.ts`, `packages/core/src/index.ts`, `tests/unit/query.test.ts`
- **Max diff**: $\le 120$ lines
- **Acceptance**: Empty queries, >200 char queries, and control character floods rejected.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0105`

### AATP-0204 — Redirect Policy & Hostname Allowlist
- **Goal**: Enforce `redirect: 'manual'` and ensure any redirect target matches `provider.allowedRedirectHosts`.
- **Files allowed**: `packages/providers/src/fetcher.ts`, `packages/providers/src/index.ts`, `tests/unit/redirect.test.ts`
- **Max diff**: $\le 150$ lines
- **Acceptance**: Upstream redirect to untrusted domain is aborted immediately.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0202`

### AATP-0205 — Request Header Sanitizer & Anti-Forwarding
- **Goal**: Strip client cookies, auth tokens, and CF-Connecting-IP from upstream fetches.
- **Files allowed**: `packages/providers/src/headers.ts`, `packages/providers/src/index.ts`, `tests/unit/headers.test.ts`
- **Max diff**: $\le 110$ lines
- **Acceptance**: Test server verifies no client authorization/cookie headers reach upstream.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0204`

### AATP-0206 — Response Content-Type & Size Enforcement
- **Goal**: Enforce max response size (2MB) and validate `application/json` / `application/xml`. Reject raw HTML.
- **Files allowed**: `packages/providers/src/parser.ts`, `packages/providers/src/index.ts`, `tests/unit/parser.test.ts`
- **Max diff**: $\le 160$ lines
- **Acceptance**: `Content-Type: text/html` and responses >2MB are aborted.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0205`

### AATP-0207 — Provider Timeout & Failure Isolation
- **Goal**: Enforce 5s abort timeout per provider and isolate failures so one timeout does not fail other providers.
- **Files allowed**: `packages/core/src/timeout.ts`, `packages/core/src/isolation.ts`, `tests/unit/isolation.test.ts`
- **Max diff**: $\le 140$ lines
- **Acceptance**: Slow upstream fixture aborts cleanly while concurrent providers return data.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0206`

### AATP-0208 — Circuit Breaker for Degrading Providers
- **Goal**: Implement stateful circuit breaker (`CLOSED` $\rightarrow$ `OPEN` $\rightarrow$ `HALF_OPEN`) with cooldown.
- **Files allowed**: `packages/core/src/circuit-breaker.ts`, `packages/core/src/index.ts`, `tests/unit/circuit-breaker.test.ts`
- **Max diff**: $\le 150$ lines
- **Acceptance**: 3 consecutive failures open the circuit; requests fail-fast during cooldown.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0207`

### AATP-0209 — Edge Worker API Router (`POST /api/v1/search`)
- **Goal**: Implement Cloudflare Worker router dispatching typed search requests without `?target=`.
- **Files allowed**: `apps/edge/src/index.ts`, `apps/edge/src/router.ts`, `apps/edge/package.json`, `tests/integration/edge.test.ts`
- **Max diff**: $\le 180$ lines
- **Acceptance**: `curl -X POST /api/v1/search` with valid payload returns normalized JSON.
- **Forbidden paths**: `apps/web/*`
- **Depends on**: `AATP-0208`

---

## Phase 3 — Browser Core Engine & Deduplication

### AATP-0301 — Search Dispatcher & Incremental Streaming
- **Goal**: Implement client-side `SearchDispatcher` exposing async iterable batches for UI rendering.
- **Files allowed**: `apps/web/src/core/dispatcher.ts`, `apps/web/src/core/types.ts`, `tests/unit/dispatcher.test.ts`
- **Max diff**: $\le 150$ lines
- **Acceptance**: `dispatcher.search()` yields results incrementally as providers respond.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0209`

### AATP-0302 — Exact InfoHash Deduplication
- **Goal**: Merge duplicate search items sharing identical 40-char hex InfoHash across providers.
- **Files allowed**: `packages/core/src/dedup-exact.ts`, `packages/core/src/index.ts`, `tests/unit/dedup-exact.test.ts`
- **Max diff**: $\le 120$ lines
- **Acceptance**: Duplicate fixtures merge into canonical item retaining combined swarm counts.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0103`

### AATP-0303 — Secondary Size-Tolerant Deduplication
- **Goal**: Fallback deduplication using normalized title + file size tolerance (1%) + category.
- **Files allowed**: `packages/core/src/dedup-secondary.ts`, `packages/core/src/index.ts`, `tests/unit/dedup-secondary.test.ts`
- **Max diff**: $\le 140$ lines
- **Acceptance**: Distinct file releases with identical titles are not merged.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0302`

### AATP-0304 — Deterministic Ranking Engine
- **Goal**: Implement multi-signal ranking (`Availability`, `Freshness`, `MetadataCompleteness`, `ProviderConfidence`).
- **Files allowed**: `packages/core/src/ranking.ts`, `packages/core/src/index.ts`, `tests/unit/ranking.test.ts`
- **Max diff**: $\le 150$ lines
- **Acceptance**: Deterministic ranking score calculation verified across sample fixtures.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0303`

---

## Phase 4 — Client Storage & Privacy Controls

### AATP-0401 — IndexedDB Cache & Schema Versioning
- **Goal**: Implement versioned `cherrytor_db` with `search_cache` store and TTL expiration index.
- **Files allowed**: `apps/web/src/storage/db.ts`, `apps/web/src/storage/cache.ts`, `tests/unit/cache.test.ts`
- **Max diff**: $\le 160$ lines
- **Acceptance**: Expired cache entries (>30m) are invalidated automatically.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0301`

### AATP-0402 — Search History & Privacy Settings
- **Goal**: Implement local search history store with disable toggle and independent purge actions.
- **Files allowed**: `apps/web/src/storage/history.ts`, `apps/web/src/storage/settings.ts`, `tests/unit/storage-privacy.test.ts`
- **Max diff**: $\le 140$ lines
- **Acceptance**: Clear history and disable history settings prevent query retention.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0401`

### AATP-0403 — Zero-Secret Static Storage Audit
- **Goal**: Add static test verifying no passwords, RPC tokens, or secret keys are stored in IndexedDB.
- **Files allowed**: `tests/security/storage-audit.test.ts`
- **Max diff**: $\le 90$ lines
- **Acceptance**: Security test scans storage schemas and rejects non-whitelisted keys.
- **Forbidden paths**: `apps/*`
- **Depends on**: `AATP-0402`

---

## Phase 5 — Content Security & Safe Parsing

### AATP-0501 — RFC Magnet Link Parser & Validator
- **Goal**: Parse `magnet:?xt=urn:btih:...` with strict regex and reject dangerous schemes (`javascript:`, `data:`).
- **Files allowed**: `packages/core/src/magnet.ts`, `packages/core/src/index.ts`, `tests/unit/magnet.test.ts`
- **Max diff**: $\le 140$ lines
- **Acceptance**: Malformed magnets and non-magnet schemes fail closed.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0103`

### AATP-0502 — Safe DOM TextContent Renderer (XSS Defense)
- **Goal**: Create UI rendering utility utilizing pure `textContent` / safe nodes, with zero `innerHTML` usage.
- **Files allowed**: `apps/web/src/components/safe-render.ts`, `tests/unit/safe-render.test.ts`
- **Max diff**: $\le 120$ lines
- **Acceptance**: Malicious XSS fixtures `<img src=x onerror=alert(1)>` render safely as raw text.
- **Forbidden paths**: `apps/edge/*`
- **Depends on**: `AATP-0501`

---

## Phase 6 — Terminal UI Frontend

### AATP-0601 — Tokenized CSS & Retro Terminal Layout
- **Goal**: Integrate `design/tokens-v1.json` into production CSS layout with CRT overlay and responsive grid.
- **Files allowed**: `apps/web/src/styles/tokens.css`, `apps/web/src/styles/main.css`, `apps/web/package.json`
- **Max diff**: $\le 180$ lines
- **Acceptance**: App renders in Terminal Dark with active CRT effects and zero unmapped hex colors.
- **Forbidden paths**: `packages/*`
- **Depends on**: `AATP-0502`

### AATP-0602 — Search Bar & Header Component
- **Goal**: Implement Cherry + Torrent logo header, search input (`>_`), and provider feed status chips.
- **Files allowed**: `apps/web/src/components/header.ts`, `apps/web/src/components/search-bar.ts`, `apps/web/src/styles/header.css`
- **Max diff**: $\le 170$ lines
- **Acceptance**: Live typing triggers debounced query dispatch with shortcut `/` focus.
- **Forbidden paths**: `packages/*`
- **Depends on**: `AATP-0601`

### AATP-0603 — Progressive Results Table & Density Modes
- **Goal**: Implement results table with sortable headers, swarm pills, health categories, and density switch.
- **Files allowed**: `apps/web/src/components/results-table.ts`, `apps/web/src/styles/table.css`
- **Max diff**: $\le 180$ lines
- **Acceptance**: Results render progressively per provider batch with comfortable/compact modes.
- **Forbidden paths**: `packages/*`
- **Depends on**: `AATP-0602`

### AATP-0604 — Inspector Modal & Ranking Explainability Drawer
- **Goal**: Build inspector modal showing parsed magnet params, BTIH entropy, and ranking signals breakdown.
- **Files allowed**: `apps/web/src/components/inspector-modal.ts`, `apps/web/src/styles/modal.css`
- **Max diff**: $\le 160$ lines
- **Acceptance**: Clicking "INSPECT" opens verified metadata and explains ranking signals.
- **Forbidden paths**: `packages/*`
- **Depends on**: `AATP-0603`

### AATP-0605 — Settings & Privacy Modal
- **Goal**: Build settings modal with history purge, cache clear, and architectural invariants status.
- **Files allowed**: `apps/web/src/components/settings-modal.ts`, `apps/web/src/styles/settings.css`
- **Max diff**: $\le 150$ lines
- **Acceptance**: Settings modal clears history and purges cache on button click.
- **Forbidden paths**: `packages/*`
- **Depends on**: `AATP-0604`

---

## Phase 7 — Verification & Security Regression Matrix

### AATP-1101 — Security Regression Test Suite
- **Goal**: Implement end-to-end security regression suite verifying all 10 architectural invariants.
- **Files allowed**: `tests/security/invariants.test.ts`, `tests/security/anti-proxy.test.ts`, `package.json`
- **Max diff**: $\le 190$ lines
- **Acceptance**: Automated tests verify: 0 arbitrary proxy, 0 redirect escape, 0 raw HTML relay, 0 storage secrets.
- **Forbidden paths**: `apps/*`
- **Depends on**: `AATP-0605`
