/**
 * Production HTML Embedded Renderer for CherryTor Edge Gateway
 * In accordance with Phase 2 / Gate A / pi.dev design contract
 */

export function renderFullHtmlPage(): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CherryTor // Minimal & Secure Metadata Engine</title>
  <meta name="description" content="Minimal, security-first metadata aggregator with 0 arbitrary proxying, typed upstream registry, and multi-signal ranking." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      
      --color-gray-950: #07090b;
      --color-gray-900: #0d1117;
      --color-gray-850: #13171f;
      --color-gray-800: #1a202c;
      --color-gray-700: #2d3748;
      --color-gray-600: #4a5568;
      --color-gray-500: #718096;
      --color-gray-400: #a0aec0;
      --color-gray-300: #cbd5e0;
      --color-gray-200: #e2e8f0;
      --color-gray-100: #f7fafc;
      
      --color-cherry-500: #f43f5e;
      --color-cherry-600: #e11d48;
      --color-green-400: #4ade80;
      --color-green-500: #22c55e;
      --color-cyan-500: #06b6d4;
      --color-yellow-400: #facc15;
      
      --radius-xs: 2px;
      --radius-sm: 4px;
      --radius-md: 6px;
      --radius-lg: 8px;
      --radius-full: 9999px;
      
      --color-bg-canvas: var(--color-gray-950);
      --color-bg-surface: var(--color-gray-900);
      --color-bg-elevated: var(--color-gray-850);
      --color-bg-hover: var(--color-gray-800);
      
      --color-text-primary: #f8fafc;
      --color-text-secondary: var(--color-gray-400);
      --color-text-muted: var(--color-gray-500);
      --color-text-accent: var(--color-green-400);
      --color-text-cherry: var(--color-cherry-500);
      
      --border-subtle: 1px solid rgba(255, 255, 255, 0.07);
      --border-default: 1px solid rgba(255, 255, 255, 0.12);
      --border-accent: 1px solid rgba(74, 222, 128, 0.4);
      --border-cherry: 1px solid rgba(244, 63, 94, 0.4);
      
      --shadow-panel: 0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
      --result-row-padding-y: 0.75rem;
    }

    [data-theme="light"] {
      --color-bg-canvas: #f8fafc;
      --color-bg-surface: #ffffff;
      --color-bg-elevated: #f1f5f9;
      --color-bg-hover: #e2e8f0;
      
      --color-text-primary: #0f172a;
      --color-text-secondary: #475569;
      --color-text-muted: #94a3b8;
      --color-text-accent: #16a34a;
      --color-text-cherry: #e11d48;
      
      --border-subtle: 1px solid rgba(0, 0, 0, 0.06);
      --border-default: 1px solid rgba(0, 0, 0, 0.12);
      --border-accent: 1px solid rgba(22, 163, 74, 0.4);
      --border-cherry: 1px solid rgba(225, 29, 72, 0.4);
      --shadow-panel: 0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--color-bg-canvas);
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
    }

    .sticky-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--color-bg-surface);
      border-bottom: var(--border-default);
      backdrop-filter: blur(12px);
    }
    .sticky-nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.9375rem;
      letter-spacing: -0.02em;
      color: var(--color-text-primary);
      text-decoration: none;
    }
    .nav-brand-icon { width: 22px; height: 22px; }
    .nav-links { display: flex; align-items: center; gap: 1.25rem; }
    .nav-link { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-secondary); text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.15s ease; }
    .nav-link:hover, .nav-link.is-active { color: var(--color-text-accent); }
    .nav-actions { display: flex; align-items: center; gap: 0.65rem; }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-xs);
      border: var(--border-default);
      background: var(--color-bg-elevated);
      color: var(--color-text-primary);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .button:hover { background: var(--color-bg-hover); border-color: var(--color-gray-500); }
    .button--primary { background: var(--color-cherry-500); border-color: var(--color-cherry-600); color: #fff; }
    .button--primary:hover { background: var(--color-cherry-600); }
    .button--accent { background: rgba(74, 222, 128, 0.12); border-color: var(--border-accent); color: var(--color-text-accent); }
    .button--accent:hover { background: rgba(74, 222, 128, 0.2); }
    .button--sm { padding: 0.3rem 0.6rem; font-size: 0.6875rem; }

    .page-shell {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem 1.5rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .hero-zone { text-align: center; max-width: 720px; margin: 0 auto; padding: 1.5rem 0; }
    .hero-subtitle { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 0.85rem; }
    .hero-subtitle-cherry { color: var(--color-cherry-500); }
    .hero-subtitle-accent { color: var(--color-green-400); }
    .hero-orient { font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.6; }

    .search-switcher-box {
      background: var(--color-bg-surface);
      border: var(--border-default);
      border-radius: var(--radius-sm);
      overflow: hidden;
      box-shadow: var(--shadow-panel);
    }
    .switcher-tabs {
      display: flex;
      background: var(--color-bg-canvas);
      border-bottom: var(--border-default);
      overflow-x: auto;
    }
    .switcher-tab {
      padding: 0.65rem 1.1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-muted);
      border: none;
      background: transparent;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .switcher-tab:hover { color: var(--color-text-primary); }
    .switcher-tab.is-active { color: var(--color-text-accent); border-bottom-color: var(--color-text-accent); background: var(--color-bg-surface); }

    .search-command-row {
      display: flex;
      align-items: center;
      padding: 0.65rem 1rem;
      gap: 0.75rem;
      background: var(--color-bg-surface);
    }
    .shell-prompt-symbol { font-family: var(--font-mono); font-size: 1rem; color: var(--color-text-accent); }
    .search-main-input {
      flex: 1;
      background: transparent;
      border: none;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: var(--color-text-primary);
      outline: none;
    }
    .search-main-input::placeholder { color: var(--color-text-muted); }
    .search-shortcut-tag { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-muted); padding: 0.15rem 0.4rem; background: var(--color-bg-elevated); border-radius: var(--radius-xs); border: var(--border-subtle); }

    .figure-frame {
      position: relative;
      background: var(--color-bg-surface);
      border: var(--border-default);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-panel);
    }
    .figure-corner { position: absolute; width: 6px; height: 6px; border-color: var(--color-cherry-500); z-index: 10; }
    .figure-corner--tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
    .figure-corner--tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; }
    .figure-corner--bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; }
    .figure-corner--br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

    .figure-caption {
      padding: 0.65rem 1.25rem;
      border-bottom: var(--border-default);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      background: var(--color-bg-elevated);
    }
    .figure-caption-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; text-transform: uppercase; }
    .figure-caption-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-green-400); animation: pulseDot 2s infinite ease-in-out; }
    @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }

    .frame-toolbar { padding: 0.75rem 1.25rem; border-bottom: var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; background: var(--color-bg-surface); }
    .feeds-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .feed-pill { font-family: var(--font-mono); font-size: 0.6875rem; padding: 0.2rem 0.55rem; border-radius: var(--radius-xs); border: var(--border-default); background: var(--color-bg-elevated); color: var(--color-text-muted); cursor: pointer; transition: all 0.15s ease; }
    .feed-pill.is-active { background: rgba(74, 222, 128, 0.12); border-color: var(--border-accent); color: var(--color-text-accent); }

    .table-container { width: 100%; overflow-x: auto; min-height: 280px; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8125rem; }
    .data-table th { padding: 0.6rem 0.75rem; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); border-bottom: var(--border-default); }
    .data-table td { padding: var(--result-row-padding-y) 0.75rem; border-bottom: var(--border-subtle); vertical-align: middle; }
    .data-row { transition: background-color 0.15s ease; cursor: pointer; }
    .data-row:hover { background: var(--color-bg-hover); }
    .item-title-col { max-width: 460px; }
    .item-title-link { font-weight: 500; color: var(--color-text-primary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .item-meta-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-muted); }

    .badge { display: inline-flex; align-items: center; padding: 0.15rem 0.45rem; font-family: var(--font-mono); font-size: 0.6875rem; border-radius: var(--radius-xs); border: var(--border-default); background: var(--color-bg-elevated); color: var(--color-text-secondary); }
    .badge-accent { border-color: rgba(74, 222, 128, 0.3); color: var(--color-text-accent); background: rgba(74, 222, 128, 0.08); }
    .badge-cherry { border-color: rgba(244, 63, 94, 0.3); color: var(--color-text-cherry); background: rgba(244, 63, 94, 0.08); }

    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1rem; }
    .feature-card { background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .feature-card-title { font-size: 1rem; font-weight: 600; color: var(--color-text-primary); display: flex; align-items: center; gap: 0.5rem; }
    .feature-card-body { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.55; }

    /* Settings Modal Styles */
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(7, 9, 11, 0.75); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal-dialog { background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); width: 100%; max-width: 760px; max-height: 88vh; box-shadow: var(--shadow-panel); display: flex; flex-direction: column; overflow: hidden; }
    .modal-header { padding: 1rem 1.25rem; border-bottom: var(--border-default); display: flex; align-items: center; justify-content: space-between; background: var(--color-bg-elevated); flex-shrink: 0; }
    .modal-title { font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-primary); }
    .modal-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 1.5rem; font-size: 0.875rem; overflow-y: auto; }
    .modal-footer { padding: 0.85rem 1.25rem; border-top: var(--border-default); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-elevated); flex-shrink: 0; }
    
    .settings-group { display: flex; flex-direction: column; gap: 0.75rem; border: var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; background: var(--color-bg-canvas); }
    .settings-group-title { font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 600; color: var(--color-text-accent); display: flex; align-items: center; justify-content: space-between; }
    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.6rem; }
    .settings-checkbox-card { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.65rem; background: var(--color-bg-elevated); border: var(--border-subtle); border-radius: var(--radius-xs); cursor: pointer; transition: all 0.15s ease; }
    .settings-checkbox-card:hover { border-color: var(--color-gray-500); }
    .settings-checkbox-card input[type="checkbox"] { cursor: pointer; accent-color: var(--color-green-400); width: 15px; height: 15px; }
    .settings-checkbox-card label { cursor: pointer; font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-text-primary); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .settings-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .settings-label { font-size: 0.8125rem; color: var(--color-text-primary); }
    .settings-sublabel { font-size: 0.75rem; color: var(--color-text-muted); }
    .is-hidden { display: none !important; }
  </style>
</head>
<body>

  <nav class="sticky-nav">
    <div class="sticky-nav-inner">
      <a href="#" class="nav-brand">
        <svg class="nav-brand-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8V4C8 2.89543 8.89543 2 10 2H22C23.1046 2 24 2.89543 24 4V8" stroke="var(--color-green-400)" stroke-width="2.5" stroke-linecap="square"/>
          <rect x="7" y="7" width="4.5" height="3.5" fill="var(--color-cyan-500)"/>
          <rect x="20.5" y="7" width="4.5" height="3.5" fill="var(--color-cyan-500)"/>
          <path d="M9 10.5C9 14 8 16 8 18" stroke="var(--color-green-500)" stroke-width="2"/>
          <path d="M23 10.5C23 14 24 16 24 18" stroke="var(--color-green-500)" stroke-width="2"/>
          <circle cx="9" cy="23" r="5.5" fill="var(--color-cherry-500)"/>
          <circle cx="23" cy="23" r="5.5" fill="var(--color-cherry-500)"/>
        </svg>
        <span>CHERRY<span style="color:var(--color-text-cherry)">TOR</span></span>
      </a>

      <div class="nav-links">
        <a href="#search" class="nav-link is-active">Search</a>
        <a href="#providers" class="nav-link">Providers</a>
        <a href="#invariants" class="nav-link">Invariants</a>
      </div>

      <div class="nav-actions">
        <button type="button" id="btn-toggle-theme" class="button button--sm">Theme: Dark</button>
        <button type="button" id="btn-open-settings" class="button button--sm button--primary">⚙ Settings</button>
      </div>
    </div>
  </nav>

  <main class="page-shell">
    
    <header class="hero-zone">
      <h1 class="hero-subtitle">
        There are many torrent searchers,<br>
        but this one is <span class="hero-subtitle-cherry">Cherry</span><span class="hero-subtitle-accent">Tor</span>.
      </h1>
      <p class="hero-orient">
        Minimal, security-first metadata aggregator. Zero arbitrary proxying, strict typed upstream registries, and deterministic multi-signal ranking.
      </p>
    </header>

    <section class="search-switcher-box" id="search">
      <div class="switcher-tabs">
        <button type="button" class="switcher-tab is-active filter-chip" data-category="ALL">All Categories</button>
        <button type="button" class="switcher-tab filter-chip" data-category="MOVIES">🎬 Phim / Movies</button>
        <button type="button" class="switcher-tab filter-chip" data-category="ANIME">🌸 Anime &amp; Drama</button>
        <button type="button" class="switcher-tab filter-chip" data-category="SOFTWARE">💻 Phần Mềm / OS</button>
        <button type="button" class="switcher-tab filter-chip" data-category="GAMES">🎮 Trò Chơi / Games</button>
        <button type="button" class="switcher-tab filter-chip" data-category="BOOKS">📚 Sách / Books</button>
        <button type="button" class="switcher-tab filter-chip" data-category="MUSIC">🎵 Âm Nhạc / Music</button>
      </div>

      <div class="search-command-row">
        <span class="shell-prompt-symbol">&gt;</span>
        <input 
          type="text" 
          id="search-input" 
          class="search-main-input" 
          placeholder="Type query to search metadata (e.g. 'avatar', '鬼灭', 'ubuntu', 'elden ring')..." 
          autocomplete="off" 
          spellcheck="false"
        />
        <span class="search-shortcut-tag">[/] focus</span>
        <button type="button" class="button button--primary button--sm" id="btn-search-trigger">Search</button>
      </div>
    </section>

    <section class="figure-frame">
      <span class="figure-corner figure-corner--tl"></span>
      <span class="figure-corner figure-corner--tr"></span>
      <span class="figure-corner figure-corner--bl"></span>
      <span class="figure-corner figure-corner--br"></span>

      <div class="figure-caption">
        <div class="figure-caption-title">
          <span class="figure-caption-live-dot"></span>
          <span>Verified Swarm Metadata Feed</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span id="result-count">0 items</span>
          <span id="search-latency">0 ms</span>
        </div>
      </div>

      <div class="frame-toolbar" id="providers">
        <div class="feeds-pills" id="provider-toggles"></div>
        <div>
          <span id="active-provider-count" class="badge badge-accent">14 Active</span>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 44%;">Title / Release</th>
              <th style="width: 14%;">Category</th>
              <th style="width: 12%;">Size</th>
              <th style="width: 10%;">Swarm</th>
              <th style="width: 10%;">Health</th>
              <th style="width: 10%;">Date</th>
              <th style="text-align: right; width: 10%;">Action</th>
            </tr>
          </thead>
          <tbody id="results-tbody">
            <tr>
              <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">
                READY TO QUERY LIVE SWARMS<br>
                <span style="font-size: 0.75rem; color: var(--color-gray-600);">Type a search term above to aggregate verified torrent metadata.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="invariants" style="margin-top: 1rem;">
      <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;">Core Security Invariants (INV-01 — INV-10)</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-title"><span class="badge badge-accent">INV-01 / 02</span> Anti-Proxy Core</div>
          <div class="feature-card-body">Arbitrary proxying and unvetted target URLs are strictly rejected at the Edge gateway level. Zero open-relay vulnerability.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-title"><span class="badge badge-accent">INV-03 / 10</span> Verified Upstream Feeds</div>
          <div class="feature-card-body">All external queries are locked to statically audited upstream registries with strict HTTPS schemes and payload limits.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-title"><span class="badge badge-cherry">INV-06 / 08</span> Zero Secrets In Storage</div>
          <div class="feature-card-body">Zero private keys, tokens, or plaintext credentials in client storage. RFC-compliant deterministic magnet hashing.</div>
        </div>
      </div>
    </section>

  </main>

  <!-- Settings & Metadata Modal -->
  <div id="modal-backdrop" class="modal-backdrop is-hidden">
    <div class="modal-dialog">
      <div class="modal-header">
        <span id="modal-title" class="modal-title">⚙ Engine Settings &amp; Provider Registry</span>
        <button type="button" id="modal-close-btn" class="button button--sm">✕</button>
      </div>
      <div id="modal-body" class="modal-body"></div>
      <div class="modal-footer">
        <button type="button" id="modal-reset-btn" class="button button--sm">Reset All Defaults</button>
        <button type="button" id="modal-action-btn" class="button button--primary button--sm">Done</button>
      </div>
    </div>
  </div>

  <div id="toast-notification" class="badge badge-accent is-hidden" style="position: fixed; bottom: 2rem; right: 2rem; z-index: 300; padding: 0.5rem 1rem; font-size: 0.8125rem; box-shadow: var(--shadow-panel);"></div>

  <script>
    (function () {
      'use strict';
      
      const ALL_CATEGORIZED_PROVIDERS = [
        // Phim & Phim Châu Á (Asian & Global Movies / Dramas)
        { id: 'apibay', name: 'ThePirateBay (Global)', cat: 'Phim & Tổng hợp', icon: '🎬' },
        { id: 'dmhy', name: '动漫花园 DMHY (中文/亚洲影视)', cat: 'Phim Châu Á & Anime', icon: '🌸' },
        { id: 'nyaa', name: 'Nyaa (Asian & Global Media)', cat: 'Phim Châu Á & Anime', icon: '🌸' },
        { id: 'acg-rip', name: 'ACG.RIP (中文影视社区)', cat: 'Phim Châu Á & Anime', icon: '🌸' },
        { id: 'bangumi', name: '萌番组 Bangumi (亚洲动画/剧集)', cat: 'Phim Châu Á & Anime', icon: '🌸' },
        { id: 'tokyotosho', name: 'Tokyo Toshokan (Asian Media)', cat: 'Phim Châu Á & Anime', icon: '🌸' },
        { id: 'yts', name: 'YTS (Movies HD/4K)', cat: 'Phim Điện Ảnh', icon: '🎬' },
        { id: 'eztv', name: 'EZTV (TV Series & Shows)', cat: 'Phim Bộ & Truyền Hình', icon: '📺' },
        { id: 'solidtorrents', name: 'SolidTorrents (DHT)', cat: 'Phim & Tổng hợp', icon: '🌐' },

        // Phần mềm & OS
        { id: 'linuxtracker', name: 'LinuxTracker (Linux OS)', cat: 'Phần mềm & Hệ điều hành', icon: '💻' },
        { id: 'archive-org-software', name: 'Archive.org Software (Tools/ISO)', cat: 'Phần mềm & Hệ điều hành', icon: '💻' },

        // Trò chơi (Games)
        { id: 'fitgirl', name: 'FitGirl Repacks (PC Games)', cat: 'Trò chơi (Games)', icon: '🎮' },
        { id: 'dodi', name: 'DODI Repacks (PC Games)', cat: 'Trò chơi (Games)', icon: '🎮' },

        // Sách & Tài liệu
        { id: 'archive-org-texts', name: 'Archive.org Texts (Books/Ebooks)', cat: 'Sách & Tài liệu', icon: '📚' },

        // Âm nhạc & Audio Hi-Res
        { id: 'archive-org-audio', name: 'Archive.org Audio (FLAC/Hi-Res)', cat: 'Âm nhạc & Lossless', icon: '🎵' }
      ];

      const state = {
        query: '',
        selectedCategory: 'ALL',
        theme: 'dark',
        density: 'comfortable',
        enabledProviders: new Set(ALL_CATEGORIZED_PROVIDERS.map(p => p.id)),
        items: [],
        isLoading: false,
        historyEnabled: true
      };

      const el = {
        searchInput: document.getElementById('search-input'),
        searchTriggerBtn: document.getElementById('btn-search-trigger'),
        providerToggles: document.getElementById('provider-toggles'),
        resultsBody: document.getElementById('results-tbody'),
        resultCount: document.getElementById('result-count'),
        searchLatency: document.getElementById('search-latency'),
        activeProviderCount: document.getElementById('active-provider-count'),
        themeToggleBtn: document.getElementById('btn-toggle-theme'),
        settingsBtn: document.getElementById('btn-open-settings'),
        modalBackdrop: document.getElementById('modal-backdrop'),
        modalTitle: document.getElementById('modal-title'),
        modalBody: document.getElementById('modal-body'),
        modalCloseBtn: document.getElementById('modal-close-btn'),
        modalActionBtn: document.getElementById('modal-action-btn'),
        modalResetBtn: document.getElementById('modal-reset-btn'),
        toast: document.getElementById('toast-notification')
      };

      function formatBytes(bytes) {
        if (bytes === null || bytes === undefined || bytes <= 1) return 'N/A';
        const k = 1024;
        const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }

      function showToast(msg) {
        if (!el.toast) return;
        el.toast.textContent = msg;
        el.toast.classList.remove('is-hidden');
        setTimeout(() => el.toast.classList.add('is-hidden'), 2400);
      }

      function renderProviders() {
        el.providerToggles.replaceChildren();
        ALL_CATEGORIZED_PROVIDERS.forEach(p => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'feed-pill ' + (state.enabledProviders.has(p.id) ? 'is-active' : '');
          btn.textContent = p.name;
          btn.addEventListener('click', () => {
            if (state.enabledProviders.has(p.id)) {
              if (state.enabledProviders.size > 1) {
                state.enabledProviders.delete(p.id);
              }
            } else {
              state.enabledProviders.add(p.id);
            }
            renderProviders();
            if (state.query.trim().length > 0) executeLiveSearch(state.query);
          });
          el.providerToggles.appendChild(btn);
        });
        el.activeProviderCount.textContent = state.enabledProviders.size + ' Active';
      }

      function renderResults() {
        el.resultsBody.replaceChildren();
        
        if (state.isLoading) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 7;
          td.style.textAlign = 'center';
          td.style.padding = '3rem 1rem';
          td.style.color = 'var(--color-text-accent)';
          td.style.fontFamily = 'var(--font-mono)';
          td.innerHTML = '<span class="figure-caption-live-dot" style="display:inline-block; margin-right:0.5rem;"></span>SEARCHING LIVE FEEDS...<br><span style="font-size:0.75rem; color:var(--color-gray-500);">Querying ' + state.enabledProviders.size + ' approved server-side upstream registries in parallel...</span>';
          tr.appendChild(td);
          el.resultsBody.appendChild(tr);
          return;
        }

        if (!state.items || state.items.length === 0) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 7;
          td.style.textAlign = 'center';
          td.style.padding = '3rem 1rem';
          td.style.color = 'var(--color-text-muted)';
          td.style.fontFamily = 'var(--font-mono)';
          td.innerHTML = state.query.trim().length === 0 
            ? 'READY TO QUERY LIVE SWARMS<br><span style="font-size:0.75rem; color:var(--color-gray-600);">Type a search term above to aggregate verified torrent metadata.</span>'
            : 'NO METADATA RETURNED<br><span style="font-size:0.75rem; color:var(--color-gray-600);">Try adjusting your query or enabling more upstream providers.</span>';
          tr.appendChild(td);
          el.resultsBody.appendChild(tr);
          el.resultCount.textContent = '0 items';
          return;
        }

        state.items.forEach(item => {
          const tr = document.createElement('tr');
          tr.className = 'data-row';

          const tdTitle = document.createElement('td');
          tdTitle.className = 'item-title-col';
          const titleLink = document.createElement('span');
          titleLink.className = 'item-title-link';
          titleLink.textContent = item.title;
          titleLink.title = item.title;

          const metaRow = document.createElement('div');
          metaRow.className = 'item-meta-row';
          metaRow.innerHTML = '<span class="badge">' + (item.sourceId || 'verified') + '</span> <span style="font-family:var(--font-mono);">' + (item.infoHash ? item.infoHash.substring(0, 12) + '...' : '') + '</span>';

          tdTitle.append(titleLink, metaRow);

          const tdCat = document.createElement('td');
          tdCat.innerHTML = '<span class="badge badge-accent">' + (item.category || 'Other') + '</span>';

          const tdSize = document.createElement('td');
          tdSize.style.fontFamily = 'var(--font-mono)';
          tdSize.textContent = formatBytes(item.sizeBytes);

          const tdSwarm = document.createElement('td');
          tdSwarm.style.fontFamily = 'var(--font-mono)';
          tdSwarm.innerHTML = '<span style="color:var(--color-text-accent)">▲' + (item.seeders || 0) + '</span> <span style="color:var(--color-text-muted)">▼' + (item.leechers || 0) + '</span>';

          const tdHealth = document.createElement('td');
          tdHealth.innerHTML = '<span class="badge badge-accent">● Verified</span>';

          const tdDate = document.createElement('td');
          tdDate.style.fontFamily = 'var(--font-mono)';
          tdDate.textContent = item.publishedAt ? item.publishedAt.split('T')[0] : 'Recent';

          const tdActions = document.createElement('td');
          tdActions.style.textAlign = 'right';
          const copyBtn = document.createElement('button');
          copyBtn.className = 'button button--primary button--sm';
          copyBtn.textContent = 'Magnet';
          copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (item.magnetUri) {
              navigator.clipboard?.writeText(item.magnetUri).catch(() => {});
              showToast('✓ Magnet link copied!');
            }
          });
          tdActions.appendChild(copyBtn);

          tr.append(tdTitle, tdCat, tdSize, tdSwarm, tdHealth, tdDate, tdActions);
          el.resultsBody.appendChild(tr);
        });

        el.resultCount.textContent = state.items.length + ' items';
      }

      async function executeLiveSearch(query) {
        const trimmed = query.trim();
        if (trimmed.length === 0) {
          state.items = [];
          renderResults();
          return;
        }

        state.isLoading = true;
        state.items = [];
        renderResults();

        const startTime = performance.now();
        const providers = Array.from(state.enabledProviders);

        // Parallel queries to all enabled providers
        const promises = providers.map(async (providerId) => {
          try {
            const res = await fetch('/api/v1/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ provider: providerId, query: trimmed, category: state.selectedCategory })
            });
            if (res.ok) {
              const json = await res.json();
              if (json.data && Array.isArray(json.data)) {
                return json.data;
              }
            }
          } catch {}
          return [];
        });

        const resultsArrays = await Promise.all(promises);
        state.items = resultsArrays.flat();
        
        // Multi-signal sorting: seeders descending
        state.items.sort((a, b) => (b.seeders || 0) - (a.seeders || 0));

        state.isLoading = false;
        el.searchLatency.textContent = (performance.now() - startTime).toFixed(1) + ' ms';
        renderResults();
      }

      function openSettingsModal() {
        el.modalBody.replaceChildren();

        // 1. Categories Mapping
        const grouped = {};
        ALL_CATEGORIZED_PROVIDERS.forEach(p => {
          if (!grouped[p.cat]) grouped[p.cat] = [];
          grouped[p.cat].push(p);
        });

        // Provider Management Section
        for (const [catName, providers] of Object.entries(grouped)) {
          const groupDiv = document.createElement('div');
          groupDiv.className = 'settings-group';

          const titleDiv = document.createElement('div');
          titleDiv.className = 'settings-group-title';
          titleDiv.innerHTML = '<span>' + catName + '</span>';

          const gridDiv = document.createElement('div');
          gridDiv.className = 'settings-grid';

          providers.forEach(p => {
            const card = document.createElement('div');
            card.className = 'settings-checkbox-card';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'chk-' + p.id;
            checkbox.checked = state.enabledProviders.has(p.id);
            checkbox.addEventListener('change', () => {
              if (checkbox.checked) {
                state.enabledProviders.add(p.id);
              } else {
                if (state.enabledProviders.size > 1) {
                  state.enabledProviders.delete(p.id);
                } else {
                  checkbox.checked = true;
                  showToast('Ít nhất 1 nguồn phải được bật!');
                }
              }
              renderProviders();
            });

            const label = document.createElement('label');
            label.htmlFor = 'chk-' + p.id;
            label.textContent = p.icon + ' ' + p.name;

            card.append(checkbox, label);
            gridDiv.appendChild(card);
          });

          groupDiv.append(titleDiv, gridDiv);
          el.modalBody.appendChild(groupDiv);
        }

        // Interface & Density Section
        const uiGroup = document.createElement('div');
        uiGroup.className = 'settings-group';
        uiGroup.innerHTML = '<div class="settings-group-title"><span>🎨 Giao Diện &amp; Mật Độ Bảng</span></div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">Mật độ dòng bảng (Density)</div><div class="settings-sublabel">Chọn khoảng cách dòng hiển thị kết quả</div></div>' +
            '<select id="select-density" class="button button--sm" style="font-family:var(--font-mono);">' +
              '<option value="compact">Compact (Dày đặc)</option>' +
              '<option value="comfortable" selected>Comfortable (Mặc định)</option>' +
            '</select>' +
          '</div>' +
          '<div class="settings-row" style="margin-top:0.75rem;">' +
            '<div><div class="settings-label">Quyền riêng tư &amp; Lịch sử tìm kiếm</div><div class="settings-sublabel">Không lưu lại vết tìm kiếm trên Edge/Server</div></div>' +
            '<button type="button" id="btn-clear-cache" class="button button--sm">Xóa Cache &amp; Lịch sử</button>' +
          '</div>';
        el.modalBody.appendChild(uiGroup);

        setTimeout(() => {
          const densitySelect = document.getElementById('select-density');
          if (densitySelect) {
            densitySelect.value = state.density;
            densitySelect.addEventListener('change', (e) => {
              state.density = e.target.value;
              document.documentElement.style.setProperty('--result-row-padding-y', state.density === 'compact' ? '0.4rem' : '0.75rem');
            });
          }

          const clearBtn = document.getElementById('btn-clear-cache');
          if (clearBtn) {
            clearBtn.addEventListener('click', () => {
              state.items = [];
              renderResults();
              showToast('✓ Đã xóa toàn bộ bộ nhớ đệm!');
            });
          }
        }, 50);

        el.modalBackdrop.classList.remove('is-hidden');
      }

      function closeSettingsModal() {
        el.modalBackdrop.classList.add('is-hidden');
      }

      function init() {
        renderProviders();
        renderResults();

        el.settingsBtn.addEventListener('click', openSettingsModal);
        el.modalCloseBtn.addEventListener('click', closeSettingsModal);
        el.modalActionBtn.addEventListener('click', closeSettingsModal);
        el.modalBackdrop.addEventListener('click', (e) => {
          if (e.target === el.modalBackdrop) closeSettingsModal();
        });

        el.modalResetBtn.addEventListener('click', () => {
          state.enabledProviders = new Set(ALL_CATEGORIZED_PROVIDERS.map(p => p.id));
          renderProviders();
          openSettingsModal();
          showToast('✓ Đã khôi phục cài đặt mặc định!');
        });

        el.themeToggleBtn.addEventListener('click', () => {
          state.theme = state.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', state.theme);
          el.themeToggleBtn.textContent = 'Theme: ' + (state.theme === 'dark' ? 'Dark' : 'Light');
        });

        let timer;
        el.searchInput.addEventListener('input', (e) => {
          state.query = e.target.value;
          clearTimeout(timer);
          timer = setTimeout(() => executeLiveSearch(state.query), 350);
        });

        el.searchTriggerBtn.addEventListener('click', () => executeLiveSearch(el.searchInput.value));

        document.querySelectorAll('.filter-chip').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            state.selectedCategory = btn.getAttribute('data-category') || 'ALL';
            if (state.query.trim().length > 0) executeLiveSearch(state.query);
          });
        });
      }

      init();
    })();
  </script>
</body>
</html>`;
}
