# SECURITY CONTRACT & INVARIANTS — CHERRYTOR

## Mandatory Architectural Invariants
* **INV-01**: Client MUST NOT send arbitrary target URLs to Edge.
* **INV-02**: Edge MUST NOT operate as a generic HTTP proxy.
* **INV-03**: Provider URLs MUST originate strictly from server-side registry templates.
* **INV-04**: Provider responses MUST NOT be transparently relayed to the browser.
* **INV-05**: Production Edge API MUST return structured `application/json` only.
* **INV-06**: System MUST NOT attempt CAPTCHA or WAF bypass.
* **INV-07**: System MUST NOT perform arbitrary browser-to-LAN RPCs.
* **INV-08**: Storage layers MUST NOT persist secrets, auth tokens, or passwords.
* **INV-09**: P2P network operations MUST remain outside the search security boundary.
* **INV-10**: Upstream providers MUST NOT be enabled in production without passing the provider security gate.
