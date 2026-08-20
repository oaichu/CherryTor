<p align="center">
  <img src="docs/assets/cherrytor-banner.svg" alt="CherryTor Banner" width="100%">
</p>

<p align="center">
  <strong>⚡ The Ultra-Fast, Security-First, Zero-Log Swarm Aggregator &amp; Decentralized Metadata Search Engine ⚡</strong>
</p>

<p align="center">
  <a href="https://cherrytor.io.vn"><img src="https://img.shields.io/badge/Official_Domain-cherrytor.io.vn-0284C7?style=for-the-badge&logo=internet-explorer" alt="Official Domain"></a>
  <a href="https://tor.oaichuhust.workers.dev"><img src="https://img.shields.io/badge/Edge_Mirror-tor.oaichuhust.workers.dev-E11D48?style=for-the-badge&logo=cloudflare" alt="Edge Mirror"></a>
  <img src="https://img.shields.io/badge/Security-Zero--Log_Invariant-10B981?style=for-the-badge&logo=shield" alt="Zero Logs">
  <img src="https://img.shields.io/badge/TypeScript-Strict_v5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Edge_Latency-<15ms-8B5CF6?style=for-the-badge&logo=speedtest" alt="Latency">
</p>

---

## 🌟 Introduction

> *"There are many torrent search engines, but this one is **CherryTor**."*

**CherryTor** is a next-generation, high-performance BitTorrent swarm metadata aggregator and search engine deployed globally across **Cloudflare Workers Serverless Edge**. 

Engineered with a **Zero-Trust, Zero-Log architecture**, CherryTor guarantees complete user privacy: **no IP logging, no search history tracking, no surveillance cookies, and zero arbitrary proxying**.

<p align="center">
  <img src="docs/assets/cherrytor-ui-mockup.svg" alt="CherryTor & Aeropad Interface Mockup" width="100%">
</p>

---

## 🚀 Key Features

### 1. 🛡️ Absolute Privacy & Zero-Log Architecture
- **Zero Logging Guarantee**: Queries are processed strictly in ephemeral memory within Cloudflare Edge Isolates and immediately discarded upon completion.
- **Anti-Proxy Invariant (INV-01 & INV-02)**: Strict protocol prevents arbitrary proxying or illegal file relaying. CherryTor serves verified swarm metadata and standard RFC Magnet links only.
- **Client-Side Data Storage**: Bookmarks, history, and preferences stay 100% on your local device via browser `LocalStorage`.

### 2. 📝 Aeropad: The Integrated Zero-Log Torrent Scratchpad
Built directly into the CherryTor ecosystem, **Aeropad** empowers users to manage, parse, and export swarm magnet links seamlessly:
- **Instant Magnet Extraction**: Paste unstructured text, logs, or release notes to automatically parse valid `magnet:?xt=urn:btih:...` URIs and infohashes.
- **Batch Export**: 1-click batch copy formatted for BitTorrent clients (qBittorrent, Transmission, Aria2) or export to JSON/TXT.
- **Offline & Persistent**: Works offline in your browser with zero server tracking.

### 3. ⚡ 15+ Verified Global Upstream Feeds
Queries the world's most trusted public indexers in parallel with sub-second response times:

| Category | Supported Providers | Protocol / Format | Highlights |
| :--- | :--- | :---: | :--- |
| **🌸 Asian Media & Anime** | **动漫花园 (DMHY)**, **Nyaa**, **ACG.RIP**, **萌番组 (Bangumi)**, **Tokyo Toshokan** | XML / RSS 2.0 | Native Chinese, Japanese, Korean search with real-time updates |
| **🎬 Global Movies & TV** | **The Pirate Bay (Apibay)**, **YTS**, **EZTV**, **SolidTorrents** | JSON REST API | 4K/1080p BluRay, Web-DL, complete TV series, Remux |
| **🎮 PC Games & Repacks** | **FitGirl Repacks**, **DODI Repacks** | XML Feeds | High-compression PC game repacks, latest patches, and DLCs |
| **💻 Software & Operating Systems** | **LinuxTracker**, **Internet Archive Software** | XML / JSON | Linux ISO distributions, open-source software, portable tools |
| **📚 Books & Literature** | **Internet Archive Texts & Books** | Search API | Millions of free PDF, EPUB, Manga, and academic texts |
| **🎵 Music & Lossless Audio** | **Internet Archive Audio**, **FLAC Feeds** | Audio API | 24-bit/96kHz Studio Master FLAC, albums, soundtracks, OSTs |

### 4. 🌐 6-Language Localization (i18n)
Easily toggle between 6 fully localized languages from the navigation bar or settings:
- 🇻🇳 **Tiếng Việt** (Vietnamese)
- 🇺🇸 **English** (International)
- 🇨🇳 **中文** (Simplified Chinese)
- 🇯🇵 **日本語** (Japanese)
- 🇰🇷 **한국어** (Korean)
- 🇮🇩 **Bahasa Indonesia** (Indonesian)

### 5. 🎯 Smart Category Classifier & Accurate File Sizes
- **Multi-Signal Classifier (`classifier.ts`)**: Dynamically categorizes releases into Movies, Anime, Games, Software, Books, or Music.
- **Human File Size Parser**: Automatically parses file sizes from XML tags, byte counts, or bracketed titles (e.g. `12.00 GiB`, `773.62 MiB`, `48.50 GiB`).

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    User([👤 User / Browser]) -->|HTTPS / Anycast CDN| Edge[⚡ Cloudflare Worker Edge Isolate]
    
    subgraph Edge_Gateway [CherryTor Edge Gateway]
        RateLimit[🛡️ Rate Limiter: 600 req/min] --> Router[🔀 Router & Anti-Proxy Guard]
        Router --> Registry[📋 Approved Provider Registry]
        Registry --> Fetcher[🌐 Safe Upstream Fetcher]
        Fetcher --> Breaker[⚡ Circuit Breaker & Timeout]
    end

    Edge --> RateLimit
    
    subgraph Upstream_Providers [15+ Live Upstream Feeds]
        P1[(🎬 The Pirate Bay)]
        P2[(🌸 动漫花园 DMHY)]
        P3[(🌸 Nyaa ACG)]
        P4[(🎮 FitGirl / DODI)]
        P5[(📚 Internet Archive)]
        P6[(🎬 YTS / EZTV)]
    end

    Breaker --> Upstream_Providers
    Upstream_Providers --> Parser[⚙️ Safe Parser & Category Classifier]
    Parser --> Ranking[📊 Deterministic Multi-Signal Ranking]
    Ranking --> User
```

---

## 🌐 Live Deployments

- **Official Web Address**: [https://cherrytor.io.vn](https://cherrytor.io.vn)
- **Direct Edge Mirror**: [https://tor.oaichuhust.workers.dev](https://tor.oaichuhust.workers.dev)

---

## 💻 Quickstart & Self-Hosting

### 1. Prerequisites
- **Node.js**: >= 20.x
- **PNPM**: >= 9.x
- **Cloudflare Account** (Free tier is 100% sufficient)

### 2. Local Setup & Testing

```bash
# Clone the repository
git clone https://github.com/oaichu/CherryTor.git
cd CherryTor

# Install dependencies
pnpm install

# Type-check & Run full test suite (45/45 passing)
pnpm tsc --noEmit
node --experimental-strip-types --test tests/unit/*.test.ts tests/integration/*.test.ts tests/security/*.test.ts
```

### 3. Deploy to Cloudflare Edge

```bash
cd apps/edge

# Authenticate with Cloudflare (one-time setup)
pnpm wrangler login

# Deploy globally in seconds
pnpm run deploy
```

---

## 📡 API Specification

### `POST /api/v1/search`
Query swarm metadata directly from approved providers.

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "provider": "dmhy",
  "query": "elden ring",
  "category": "GAMES"
}
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "dmhy-GVV2SVPEGTWQ2KULFXCWOIMIKM4KIS6U",
      "title": "艾爾登法環 / 艾尔登法环 / ELDEN RING v1.10 [DODI]",
      "category": "Games",
      "sizeBytes": 12884901888,
      "seeders": 10,
      "leechers": 1,
      "infoHash": "gvv2svpegtwq2kulfxcwoimikm4kis6u",
      "magnetUri": "magnet:?xt=urn:btih:GVV2SVPEGTWQ2KULFXCWOIMIKM4KIS6U&...",
      "sourceId": "dmhy",
      "publishedAt": "2023-08-03T14:32:30.000Z"
    }
  ],
  "errors": [],
  "meta": {
    "provider": "dmhy",
    "latencyMs": 312,
    "timestamp": "2026-08-20T13:50:00.000Z"
  }
}
```

---

## 🔒 Security Invariants (INV-01 to INV-10)

CherryTor strictly adheres to 10 security invariants verified by automated security test suites:
1. **INV-01**: Rejects `?target=` and `?url=` parameters to prevent open-proxy abuse.
2. **INV-02**: Prohibits `/proxy` endpoints.
3. **INV-03**: Pinpoint allowlisting of upstream URLs defined in `registry.ts`.
4. **INV-04**: Rejects unstructured raw HTML upstream responses to eliminate XSS.
5. **INV-05**: Strict JSON-only API contracts with structured responses.
6. **INV-06**: Blocks dangerous URI schemes (`javascript:`, `data:`, `file:`) in magnet links.
7. **INV-07**: Sliding-window rate limiting (600 req/min) per IP.
8. **INV-08**: Zero credentials or API keys exposed to client storage.
9. **INV-09**: Transparent disclosure of P2P swarm mechanics.
10. **INV-10**: Strict validation of redirect targets against pre-approved domains.

---

## 📄 License

Distributed under the **MIT License**. Contributions, bug reports, and pull requests are warmly welcome!
