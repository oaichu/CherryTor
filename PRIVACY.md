# PRIVACY SPECIFICATION — CHERRYTOR

## Privacy Principles & Claims
1. **No Misleading Claims**: We do not claim cryptographic "zero knowledge" or "anonymity" where standard HTTPS metadata queries occur.
2. **Client-Side Privacy Controls**:
   - Search history is saved strictly in local IndexedDB / memory.
   - User can disable history persistence with one toggle.
   - User can purge search history and metadata cache independently.
3. **Privacy-Safe Edge Logging**:
   - Edge Worker logs request counts, provider response latencies, and HTTP status codes.
   - Raw user search queries, magnet URIs, and user IP addresses are never logged or stored.
