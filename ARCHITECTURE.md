# ARCHITECTURE SPECIFICATION — CHERRYTOR

Refer to full architecture documentation in [docs/architecture.md](file:///home/oaichu/CherryTor/docs/architecture.md).

## Non-Negotiable Boundary Rules
- Browser communicates with Edge API Gateway using typed endpoints: `POST /api/v1/search`.
- Request payload: `{ "provider": string, "query": string }`.
- Under no circumstances will `/proxy`, `?target=`, `?url=`, or arbitrary client-specified hostnames exist.
