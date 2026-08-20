# THREAT MODEL — CHERRYTOR

## 1. Trust Boundaries
- **Untrusted User / Browser Client**: Potentially compromised browser extensions, DOM XSS injection attempts in search queries/titles.
- **Semi-Trusted Edge Worker**: Executes in Cloudflare isolate. Must protect its own API quotas and prevent SSRF.
- **Untrusted External Upstream Providers**: Can be malicious, compromise dependencies, inject malicious HTML/scripts, return oversized payloads, or attempt redirect escaping.
- **P2P Swarm**: External peers outside search security boundary.

## 2. Assets to Protect
- Edge Worker compute quota & outbound bandwidth.
- User browser privacy & security (no arbitrary script execution, no unauthorized network pivoting).
- Integrity of verified canonical torrent metadata.

## 3. Threat Mitigations
- **SSRF / Open Proxy**: Blocked via strict server-side Provider Registry (`INV-01`, `INV-02`, `INV-03`).
- **XSS Payload in Upstream Responses**: Blocked via strict DOM `textContent` rendering and JSON/XML parsing with zero raw HTML relay (`INV-04`, `INV-05`).
- **Denial of Service / Hanging Worker**: Blocked via strict timeout (5s), payload size limit (2MB), and per-provider circuit breakers (`AATP-0209..0214`).
- **Storage Scraping**: Blocked via Zero-Secret policy in IndexedDB (`INV-08`).
