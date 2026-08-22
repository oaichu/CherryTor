# PRIVACY SPECIFICATION — CHERRYTOR

## Privacy Principles & Claims
1. **No Misleading Claims**: We do not claim cryptographic "zero knowledge" or "anonymity" where standard HTTPS metadata queries occur.
2. **Client-Side Data (as implemented in the served v1 UI)**:
   - The served web UI does **not** record or persist search history at all.
   - Bookmarks are stored locally in the browser via `localStorage` (key `cherrytor_bookmarks`) — never synced to any server.
   - UI settings (theme, language, density, safe-mode) are likewise `localStorage`-only.
   - Clearing site data in the browser removes every trace of CherryTor state.
   - The fuller IndexedDB design in `specs/db-schema.md` remains a future design target; it is not shipped yet.
3. **Privacy-Safe Edge Logging**:
   - Edge Worker logs request counts, provider response latencies, and HTTP status codes.
   - Raw user search queries, magnet URIs, and user IP addresses are never logged or stored.
4. **Upstream Visibility**: search keywords are forwarded to the selected upstream metadata providers over HTTPS (see PROVIDER_POLICY.md); those providers see the query coming from CherryTor's edge, not from the end user's IP.
