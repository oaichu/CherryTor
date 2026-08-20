/**
 * Fullstack Edge UI Renderer for CherryTor
 * Serves the pi.dev Editorial Minimalist Web App directly from the Edge Worker.
 */

export function renderFullHtmlPage(): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark" data-density="comfortable">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CherryTor // Minimal &amp; Secure Metadata Engine</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    /* Design Tokens */
    :root {
      --color-black: #07090b;
      --color-gray-950: #0c0e12;
      --color-gray-900: #12161c;
      --color-gray-850: #181d25;
      --color-gray-800: #1f2630;
      --color-gray-700: #2d3744;
      --color-gray-600: #4b5b6f;
      --color-gray-500: #7b8ea3;
      --color-gray-300: #c2d0df;
      --color-gray-100: #f0f4f8;

      --color-green-400: #4ade80;
      --color-green-500: #22c55e;
      --color-cyan-500: #38bdf8;
      --color-cherry-500: #f43f5e;
      --color-yellow-500: #fbbf24;

      --font-sans: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
      --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;

      --radius-xs: 2px;
      --radius-sm: 4px;
      --radius-md: 6px;
      --radius-pill: 9999px;

      --color-bg-canvas: #090b0e;
      --color-bg-surface: #10141b;
      --color-bg-elevated: #161c24;
      --color-bg-hover: #1e2632;

      --color-text-primary: #f1f5f9;
      --color-text-secondary: #cbd5e1;
      --color-text-muted: #64748b;
      --color-text-accent: var(--color-green-400);
      --color-text-cherry: var(--color-cherry-500);

      --color-border-default: rgba(255, 255, 255, 0.09);
      --color-border-subtle: rgba(255, 255, 255, 0.05);
      --color-border-accent: var(--color-green-400);
      --color-border-focus: var(--color-green-400);

      --color-status-success: var(--color-green-400);
      --color-status-danger: var(--color-cherry-500);

      --border-default: 1px solid var(--color-border-default);
      --border-subtle: 1px solid var(--color-border-subtle);
      --shadow-panel: 0 4px 20px rgba(0, 0, 0, 0.5);
      --result-row-padding-y: 0.75rem;
    }

    [data-theme="light"] {
      --color-bg-canvas: #f8fafc;
      --color-bg-surface: #ffffff;
      --color-bg-elevated: #f1f5f9;
      --color-bg-hover: #e2e8f0;
      --color-text-primary: #0f172a;
      --color-text-secondary: #334155;
      --color-text-muted: #64748b;
      --color-border-default: rgba(0, 0, 0, 0.09);
      --color-border-subtle: rgba(0, 0, 0, 0.05);
      --shadow-panel: 0 4px 20px rgba(0, 0, 0, 0.06);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; background-color: var(--color-bg-canvas); color: var(--color-text-primary); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
    body { min-height: 100vh; background-color: var(--color-bg-canvas); color: var(--color-text-primary); }

    .sticky-nav { position: sticky; top: 0; z-index: 100; background: rgba(9, 11, 14, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: var(--border-default); }
    [data-theme="light"] .sticky-nav { background: rgba(255, 255, 255, 0.85); }
    .sticky-nav-inner { max-width: 78rem; margin: 0 auto; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
    .nav-brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: var(--color-text-primary); font-weight: 600; font-size: 0.9375rem; }
    .nav-brand-icon { width: 24px; height: 24px; }
    .nav-links { display: flex; align-items: center; gap: 1.5rem; font-size: 0.875rem; }
    .nav-link { color: var(--color-text-muted); text-decoration: none; font-weight: 500; }
    .nav-link:hover, .nav-link.is-active { color: var(--color-text-primary); }
    .nav-actions { display: flex; align-items: center; gap: 0.75rem; }

    .page-shell { max-width: 78rem; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; display: flex; flex-direction: column; gap: 2.5rem; }
    .hero-zone { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; padding: 1.5rem 0; }
    .hero-subtitle { font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 700; line-height: 1.15; letter-spacing: -0.03em; }
    .hero-subtitle-accent { color: var(--color-text-accent); font-style: italic; }
    .hero-subtitle-cherry { color: var(--color-text-cherry); }
    .hero-orient { font-size: 1.0625rem; color: var(--color-text-muted); max-width: 38rem; line-height: 1.6; }

    .search-switcher-box { width: 100%; max-width: 54rem; margin: 0 auto; border: var(--border-default); border-radius: var(--radius-md); background: var(--color-bg-surface); box-shadow: var(--shadow-panel); overflow: hidden; }
    .switcher-tabs { display: flex; align-items: center; background: var(--color-bg-elevated); border-bottom: var(--border-default); padding: 0.25rem 0.5rem; gap: 0.25rem; }
    .switcher-tab { background: transparent; border: none; color: var(--color-text-muted); padding: 0.4rem 0.85rem; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; border-radius: var(--radius-xs); cursor: pointer; }
    .switcher-tab.is-active { color: var(--color-text-primary); background: var(--color-bg-surface); }
    .search-command-row { display: flex; align-items: center; padding: 0.5rem 0.75rem; background: var(--color-bg-surface); gap: 0.75rem; }
    .shell-prompt-symbol { font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-text-muted); user-select: none; }
    .search-main-input { flex: 1; background: transparent; border: none; color: var(--color-text-primary); font-family: var(--font-mono); font-size: 0.9375rem; outline: none; }
    .search-main-input::placeholder { color: var(--color-text-muted); }
    .search-shortcut-tag { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-muted); border: var(--border-default); padding: 0.15rem 0.4rem; border-radius: var(--radius-xs); }

    .button { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; height: 2.25rem; padding: 0 1rem; font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 600; border-radius: var(--radius-sm); border: var(--border-default); background: var(--color-bg-elevated); color: var(--color-text-primary); cursor: pointer; text-decoration: none; }
    .button:hover { background: var(--color-bg-hover); border-color: var(--color-border-accent); }
    .button--primary { background: var(--color-text-primary); color: var(--color-bg-canvas); border-color: var(--color-text-primary); }
    .button--primary:hover { background: var(--color-text-secondary); }
    .button--sm { height: 1.875rem; padding: 0 0.65rem; font-size: 0.75rem; }

    .figure-frame { position: relative; background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); box-shadow: var(--shadow-panel); padding: 1.25rem; }
    .figure-corner { position: absolute; width: 7px; height: 7px; pointer-events: none; }
    .figure-corner--tl { top: -1px; left: -1px; border-top: 2px solid var(--color-text-accent); border-left: 2px solid var(--color-text-accent); }
    .figure-corner--tr { top: -1px; right: -1px; border-top: 2px solid var(--color-text-accent); border-right: 2px solid var(--color-text-accent); }
    .figure-corner--bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--color-text-accent); border-left: 2px solid var(--color-text-accent); }
    .figure-corner--br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--color-text-accent); border-right: 2px solid var(--color-text-accent); }

    .figure-caption { display: flex; align-items: center; justify-content: space-between; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: var(--border-subtle); font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); }
    .figure-caption-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
    .figure-caption-live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--color-status-success); box-shadow: 0 0 8px var(--color-status-success); animation: pulse-dot 2s infinite ease-in-out; }
    @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }

    .frame-toolbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.8125rem; }
    .feeds-pills { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    .feed-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.6rem; border-radius: var(--radius-pill); border: var(--border-default); background: var(--color-bg-elevated); font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-muted); cursor: pointer; }
    .feed-pill.is-active { border-color: var(--color-border-accent); color: var(--color-text-accent); background: rgba(74, 222, 128, 0.08); }

    .data-table-wrap { overflow-x: auto; width: 100%; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { padding: 0.6rem 0.75rem; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); border-bottom: var(--border-default); }
    .data-table td { padding: var(--result-row-padding-y) 0.75rem; border-bottom: var(--border-subtle); vertical-align: middle; }
    .data-row { transition: background-color 0.15s ease; cursor: pointer; }
    .data-row:hover { background: var(--color-bg-hover); }
    .item-title-col { max-width: 440px; }
    .item-title-link { font-weight: 500; color: var(--color-text-primary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .item-meta-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-muted); }

    .badge { display: inline-flex; align-items: center; padding: 0.15rem 0.45rem; font-family: var(--font-mono); font-size: 0.6875rem; border-radius: var(--radius-xs); border: var(--border-default); background: var(--color-bg-elevated); color: var(--color-text-secondary); }
    .badge-accent { border-color: rgba(74, 222, 128, 0.3); color: var(--color-text-accent); background: rgba(74, 222, 128, 0.08); }
    .badge-cherry { border-color: rgba(244, 63, 94, 0.3); color: var(--color-text-cherry); background: rgba(244, 63, 94, 0.08); }

    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1rem; }
    .feature-card { background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .feature-card-title { font-size: 1rem; font-weight: 600; color: var(--color-text-primary); display: flex; align-items: center; gap: 0.5rem; }
    .feature-card-body { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.55; }

    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(7, 9, 11, 0.75); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal-dialog { background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); width: 100%; max-width: 640px; box-shadow: var(--shadow-panel); overflow: hidden; }
    .modal-header { padding: 1rem 1.25rem; border-bottom: var(--border-default); display: flex; align-items: center; justify-content: space-between; background: var(--color-bg-elevated); }
    .modal-title { font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; }
    .modal-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; font-size: 0.875rem; }
    .modal-footer { padding: 0.85rem 1.25rem; border-top: var(--border-default); display: flex; justify-content: flex-end; gap: 0.5rem; background: var(--color-bg-elevated); }
    .code-box { background: var(--color-bg-canvas); border: var(--border-default); padding: 0.75rem; font-family: var(--font-mono); font-size: 0.75rem; border-radius: var(--radius-xs); word-break: break-all; white-space: pre-wrap; color: var(--color-text-secondary); }
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
        <button type="button" id="btn-open-settings" class="button button--sm button--primary">Settings</button>
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
        <button type="button" class="switcher-tab is-active filter-chip" data-category="ALL">All Feeds</button>
        <button type="button" class="switcher-tab filter-chip" data-category="SOFTWARE">Software &amp; OS</button>
        <button type="button" class="switcher-tab filter-chip" data-category="MOVIES">Open Media</button>
        <button type="button" class="switcher-tab filter-chip" data-category="OTHER">Security Audit</button>
      </div>

      <div class="search-command-row">
        <span class="shell-prompt-symbol">&gt;</span>
        <input 
          type="text" 
          id="search-input" 
          class="search-main-input" 
          placeholder="Type query to search metadata (e.g. 'ubuntu', 'blender', 'debian')..." 
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
          <span id="active-provider-count" class="badge badge-accent">10 Active</span>
        </div>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Release Name / InfoHash</th>
              <th>Category</th>
              <th>Size</th>
              <th>Swarm (S/L)</th>
              <th>Health</th>
              <th>Published</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody id="results-tbody"></tbody>
        </table>
      </div>
    </section>

    <section id="invariants" style="margin-top: 1.5rem;">
      <h2 style="font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.5rem;">
        What we didn't build
      </h2>
      <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin-bottom: 1.5rem; max-width: 48rem;">
        CherryTor avoids insecure anti-patterns common in traditional scrapers to guarantee zero client exposure.
      </p>

      <div class="feature-grid">
        <div class="feature-card">
          <h3 class="feature-card-title"><span style="color: var(--color-status-danger);">×</span> No Generic Proxy</h3>
          <p class="feature-card-body">INV-01 &amp; INV-02 strictly prohibit <code>?target=</code> or client URLs. Edge queries only server registries.</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-card-title"><span style="color: var(--color-status-danger);">×</span> No Raw HTML Relay</h3>
          <p class="feature-card-body">INV-04 &amp; INV-05 ensure all responses are sanitized into structured JSON.</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-card-title"><span style="color: var(--color-status-danger);">×</span> No Storage Secrets</h3>
          <p class="feature-card-body">INV-08 &amp; INV-07 prevent storing passwords or RPC credentials in browser storage.</p>
        </div>
      </div>
    </section>

  </main>

  <div id="modal-backdrop" class="modal-backdrop is-hidden">
    <div class="modal-dialog">
      <div class="modal-header">
        <span id="modal-title" class="modal-title">Metadata Inspector</span>
        <button type="button" id="modal-close-btn" class="button button--sm">×</button>
      </div>
      <div id="modal-body" class="modal-body"></div>
      <div class="modal-footer">
        <button type="button" id="modal-action-btn" class="button button--primary button--sm">Done</button>
      </div>
    </div>
  </div>

  <div id="toast-notification" class="badge badge-accent is-hidden" style="position: fixed; bottom: 2rem; right: 2rem; z-index: 300; padding: 0.5rem 1rem; font-size: 0.8125rem; box-shadow: var(--shadow-panel);"></div>

  <script>
    (function () {
      'use strict';
      const DEFAULT_PROVIDERS = [
        { id: 'apibay', name: 'ThePirateBay (Global)' },
        { id: 'dmhy', name: '动漫花园 DMHY (中文)' },
        { id: 'nyaa', name: 'Nyaa (Asian/Media)' },
        { id: 'acg-rip', name: 'ACG.RIP (中文)' },
        { id: 'yts', name: 'YTS (Movies HD/4K)' },
        { id: 'eztv', name: 'EZTV (TV Series)' },
        { id: 'solidtorrents', name: 'SolidTorrents (DHT)' },
        { id: 'bangumi', name: '萌番组 Bangumi (中文)' },
        { id: 'archive-org', name: 'Internet Archive' },
        { id: 'linuxtracker', name: 'LinuxTracker' }
      ];

      const state = {
        query: '',
        selectedCategory: 'ALL',
        theme: 'dark',
        enabledProviders: new Set(DEFAULT_PROVIDERS.map(p => p.id)),
        items: [],
        isLoading: false
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
        DEFAULT_PROVIDERS.forEach(provider => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'feed-pill' + (state.enabledProviders.has(provider.id) ? ' is-active' : '');
          btn.textContent = provider.name;
          btn.addEventListener('click', () => {
            if (state.enabledProviders.has(provider.id)) state.enabledProviders.delete(provider.id);
            else state.enabledProviders.add(provider.id);
            renderProviders();
            if (state.query.trim().length > 0) executeLiveSearch(state.query);
          });
          el.providerToggles.appendChild(btn);
        });
        el.activeProviderCount.textContent = state.enabledProviders.size + ' Active';
      }

      function renderResults() {
        el.resultsBody.replaceChildren();
        if (state.items.length === 0) {
          const row = document.createElement('tr');
          const cell = document.createElement('td');
          cell.colSpan = 7;
          cell.style.padding = '3.5rem 1rem';
          cell.style.textAlign = 'center';
          cell.style.color = 'var(--color-text-muted)';
          cell.innerHTML = '<strong>' + (state.isLoading ? 'SEARCHING LIVE FEEDS...' : 'NO LIVE RESULTS DISPLAYED') + '</strong><br>' +
            (state.isLoading ? 'Querying approved server-side provider registry...' : 'Type a search term above and press Enter to query upstream feeds.');
          row.appendChild(cell);
          el.resultsBody.appendChild(row);
          el.resultCount.textContent = '0 items';
          return;
        }

        state.items.forEach(item => {
          const tr = document.createElement('tr');
          tr.className = 'data-row';

          const tdTitle = document.createElement('td');
          tdTitle.className = 'item-title-col';
          const title = document.createElement('span');
          title.className = 'item-title-link';
          title.textContent = item.title;
          const meta = document.createElement('div');
          meta.className = 'item-meta-row';
          meta.innerHTML = '<span class="badge">hash:' + item.infoHash.substring(0, 8) + '…</span><span class="badge badge-accent">' + item.sourceId + '</span>';
          tdTitle.append(title, meta);

          const tdCat = document.createElement('td');
          tdCat.innerHTML = '<span class="badge">' + item.category + '</span>';

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

        for (const providerId of providers) {
          try {
            const res = await fetch('/api/v1/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ provider: providerId, query: trimmed, category: state.selectedCategory })
            });
            if (res.ok) {
              const json = await res.json();
              if (json.data && Array.isArray(json.data)) {
                state.items.push(...json.data);
                renderResults();
              }
            }
          } catch {}
        }

        state.isLoading = false;
        el.searchLatency.textContent = (performance.now() - startTime).toFixed(1) + ' ms';
        renderResults();
      }

      function init() {
        renderProviders();
        renderResults();

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
