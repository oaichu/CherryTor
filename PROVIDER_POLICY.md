# PROVIDER ACCEPTANCE POLICY — CHERRYTOR

## Onboarding Gates for Upstream Providers
1. **Permission / Terms Review**: Provider offers open/public metadata API or RSS without bypassing anti-bot/WAF.
2. **Protocol Review**: Provider accepts structured requests (API, RSS, XML) and does not require browser emulation / headless rendering.
3. **Security Review**:
   - Upstream origin must be static HTTPS.
   - Redirects must be restricted to explicit allowlist (`provider.allowedRedirectHosts`).
   - Max payload limited to $\le 2\text{MB}$.
   - Timeout capped at 5 seconds.
4. **Adapter Implementation**: Adapter maps upstream payload directly into canonical `SearchItem` schema with complete error handling.
5. **Fixtures & Tests**: Sanitized fixtures stored in `tests/fixtures/providers/<provider-id>/` covering valid, empty, malformed, and oversized payloads.
6. **Circuit Breaker**: Pre-configured failure threshold, cooldown window, and isolation parameters.
