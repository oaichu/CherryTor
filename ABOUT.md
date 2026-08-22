# 🌸 About CherryTor & AeroPad

> *"The Internet was founded on the principles of free information exchange, open protocols, and individual sovereignty. CherryTor and AeroPad exist to safeguard those ideals without compromise."*

---

## 🎯 The Mission

Modern search engines and legacy torrent portals are overburdened with tracking scripts, intrusive pop-ups, malicious redirect chains, and surveillance logs capturing IP addresses.

**CherryTor** was architected from the ground up to be the clean, fast, strictly private alternative:

1. **Zero-log by construction** — no search histories, IP addresses or user identifiers are recorded anywhere. Every query executes in ephemeral Cloudflare Edge memory and is destroyed upon response.
2. **Multi-source aggregation** — one query federates **nine live, human-reviewed upstream indexes** (global movies/TV, DHT-wide search, anime & Asian media, Linux distributions), merged, de-duplicated by infohash and relevance-filtered server-side.
3. **Honest metadata only** — swarm counts and publish dates come from the upstream feed or don't appear at all; the UI shows exactly which source answered with how many results.
4. **Global edge performance** — served by Cloudflare Workers isolates in 300+ cities, with per-provider circuit breakers and 5-second fail-fast timeouts.
5. **Clean, distraction-free design** — zero ads, zero trackers, zero analytics. A high-density, keyboard-driven interface localized in 20 languages.

<p align="center">
  <img src="docs/assets/cherrytor-hero.png" alt="CherryTor Real Web Interface" width="100%">
</p>

---

## 📝 Meet AeroPad: The 2FA Vault & Zero-Knowledge Security Studio

A core companion project in our ecosystem is **[AeroPad](https://aeropad.pages.dev/)** — an Apple-grade cryptographic security workspace:

<p align="center">
  <img src="docs/assets/cherrytor-live-results.png" alt="CherryTor Real Live Swarm Results" width="100%">
</p>

- **2FA Studio & Offline TOTP** — generate and scan RFC-6238 one-time passwords with real-time QR camera scanning, no cloud dependencies.
- **Smart Encrypted Notepad** — client-side AES-GCM cipher vault protected by a master password.
- **Instant Magnet & Swarm Extractor** — paste raw text or release notes; AeroPad extracts valid `magnet:?xt=urn:btih:...` URIs and infohashes for batch handoff.
- **100% client-side & zero-knowledge** — keys and secrets never leave the browser isolate; fully functional offline.

---

## 🏛️ Security Invariants

CherryTor is engineered around ten non-negotiable invariants (full definitions in [SECURITY.md](SECURITY.md), threat model in [THREAT_MODEL.md](THREAT_MODEL.md)):

| Invariant | Protection |
| :--- | :--- |
| **INV-01 / 02** | Anti-proxy boundary — arbitrary `?target=` / `/proxy` requests are rejected outright. |
| **INV-03** | Upstream URLs are generated exclusively from the fixed server-side registry. |
| **INV-04 / 05** | Raw upstream HTML is never relayed; the API speaks structured JSON only. |
| **INV-06** | No CAPTCHA / WAF / anti-bot bypass — providers must offer clean structured APIs. |
| **INV-07** | No browser-to-LAN RPC from the web client. |
| **INV-08** | Zero credentials or secrets in client storage (pinned by automated audits). |
| **INV-09** | P2P networking stays outside the search security boundary. |
| **INV-10** | Unreviewed upstream providers are disabled by default. |

---

## 🌐 Live Upstream Sources

Nine verified providers are currently enabled — each must pass the [provider acceptance policy](PROVIDER_POLICY.md) before activation:

- **🎬 Global movies & TV** — The Pirate Bay (apibay), YTS, EZTV
- **🌐 DHT-wide aggregation** — SolidTorrents, BitSearch
- **🌸 Anime & Asian media** — Nyaa, 动漫花园 (DMHY), Tokyo Toshokan
- **💻 Software & operating systems** — LinuxTracker

---

## 🌍 Internationalization

CherryTor ships in **20 languages** — Vietnamese, English, Chinese, Japanese, Korean, Indonesian, Spanish, French, German, Russian, Portuguese, Italian, Turkish, Polish, Ukrainian, Arabic, Persian, Hindi, Bengali and Romanian — switchable instantly from the navigation bar.

---

## ⚖️ Legal Disclaimer & Terms of Use

1. **Non-hosting status** — CherryTor and AeroPad operate exclusively as metadata indexers and client-side cryptographic utilities. Neither platform hosts, stores, streams or distributes any copyrighted media.
2. **Decentralized protocol** — all content discovery relies on the public BitTorrent DHT network. Users are solely responsible for ensuring their P2P activity complies with local law.
3. **No surveillance logs** — in accordance with the zero-log design, no search queries, IP addresses or browser footprints are recorded.

---

<p align="center">
  <em>Built with ❤️ and distributed under the permissive <a href="LICENSE">MIT License</a>.</em><br>
  <strong>CherryTor:</strong> <a href="https://cherrytor.io.vn">https://cherrytor.io.vn</a> &bull; <strong>AeroPad:</strong> <a href="https://aeropad.pages.dev/">https://aeropad.pages.dev/</a>
</p>
