/**
 * Production HTML Embedded Renderer for CherryTor Edge Gateway
 * Multi-Language i18n Edition (vi, en, zh, ja, ko, id)
 * Advanced Features: Smart Sorter, Bookmarks ⭐, Metadata Inspector, Torznab & Safe Mode
 * In accordance with Phase 2 / Gate A / pi.dev design contract
 */

export function renderFullHtmlPage(): string {
  return `<!DOCTYPE html>
<html lang="vi" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CherryTor // Minimal & Secure Metadata Engine</title>
  <meta name="description" content="Minimal, security-first metadata aggregator with 0 arbitrary proxying, typed upstream registry, and multi-signal ranking." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --font-sans: 'Plus Jakarta Sans', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
      gap: 1rem;
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
      flex-shrink: 0;
    }
    .nav-brand-icon { width: 22px; height: 22px; }
    .nav-links { display: flex; align-items: center; gap: 1.25rem; }
    .nav-link { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-secondary); text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.15s ease; cursor: pointer; }
    .nav-link:hover, .nav-link.is-active { color: var(--color-text-accent); }
    .nav-actions { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }

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

    .select-input {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      padding: 0.3rem 0.6rem;
      border-radius: var(--radius-xs);
      border: var(--border-default);
      background: var(--color-bg-elevated);
      color: var(--color-text-primary);
      cursor: pointer;
      outline: none;
    }
    .select-input:hover { background: var(--color-bg-hover); border-color: var(--color-gray-500); }

    .text-input {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 0.4rem 0.65rem;
      border-radius: var(--radius-xs);
      border: var(--border-default);
      background: var(--color-bg-canvas);
      color: var(--color-text-primary);
      outline: none;
      width: 100%;
    }
    .text-input:focus { border-color: var(--color-green-400); }

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
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .figure-caption-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; text-transform: uppercase; }
    .figure-caption-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-green-400); animation: pulseDot 2s infinite ease-in-out; }
    @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }

    .frame-toolbar { padding: 0.75rem 1.25rem; border-bottom: var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; background: var(--color-bg-surface); }
    .feeds-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; flex: 1; }
    .feed-pill { font-family: var(--font-mono); font-size: 0.6875rem; padding: 0.2rem 0.55rem; border-radius: var(--radius-xs); border: var(--border-default); background: var(--color-bg-elevated); color: var(--color-text-muted); cursor: pointer; transition: all 0.15s ease; }
    .feed-pill.is-active { background: rgba(74, 222, 128, 0.12); border-color: var(--border-accent); color: var(--color-text-accent); }

    .controls-toolbar { padding: 0.5rem 1.25rem; border-bottom: var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; background: var(--color-bg-elevated); font-size: 0.75rem; font-family: var(--font-mono); }
    .filter-controls-group { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .filter-checkbox-label { display: flex; align-items: center; gap: 0.35rem; cursor: pointer; color: var(--color-text-secondary); }
    .filter-checkbox-label input { cursor: pointer; accent-color: var(--color-green-400); }

    .table-container { width: 100%; overflow-x: auto; min-height: 280px; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8125rem; }
    .data-table th { padding: 0.6rem 0.75rem; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); border-bottom: var(--border-default); }
    .data-table td { padding: var(--result-row-padding-y) 0.75rem; border-bottom: var(--border-subtle); vertical-align: middle; }
    .data-row { transition: background-color 0.15s ease; cursor: pointer; }
    .data-row:hover { background: var(--color-bg-hover); }
    .item-title-col { max-width: 440px; }
    .item-title-link { font-weight: 500; color: var(--color-text-primary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color 0.15s ease; }
    .item-title-link:hover { color: var(--color-green-400); text-decoration: underline; }
    .item-meta-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-muted); }

    .badge { display: inline-flex; align-items: center; padding: 0.15rem 0.45rem; font-family: var(--font-mono); font-size: 0.6875rem; border-radius: var(--radius-xs); border: var(--border-default); background: var(--color-bg-elevated); color: var(--color-text-secondary); }
    .badge-accent { border-color: rgba(74, 222, 128, 0.3); color: var(--color-text-accent); background: rgba(74, 222, 128, 0.08); }
    .badge-cherry { border-color: rgba(244, 63, 94, 0.3); color: var(--color-text-cherry); background: rgba(244, 63, 94, 0.08); }

    .btn-bookmark { background: transparent; border: none; font-size: 1.05rem; cursor: pointer; color: var(--color-text-muted); transition: transform 0.15s ease, color 0.15s ease; }
    .btn-bookmark:hover { transform: scale(1.2); }
    .btn-bookmark.is-bookmarked { color: var(--color-yellow-400); }

    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1rem; }
    .feature-card { background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .feature-card-title { font-size: 1rem; font-weight: 600; color: var(--color-text-primary); display: flex; align-items: center; gap: 0.5rem; }
    .feature-card-body { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.55; }

    /* Modals Styles */
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(7, 9, 11, 0.75); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal-dialog { background: var(--color-bg-surface); border: var(--border-default); border-radius: var(--radius-md); width: 100%; max-width: 780px; max-height: 88vh; box-shadow: var(--shadow-panel); display: flex; flex-direction: column; overflow: hidden; }
    .modal-header { padding: 1rem 1.25rem; border-bottom: var(--border-default); display: flex; align-items: center; justify-content: space-between; background: var(--color-bg-elevated); flex-shrink: 0; }
    .modal-title { font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-primary); }
    .modal-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; font-size: 0.875rem; overflow-y: auto; }
    .modal-footer { padding: 0.85rem 1.25rem; border-top: var(--border-default); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-elevated); flex-shrink: 0; }
    
    .settings-group { display: flex; flex-direction: column; gap: 0.75rem; border: var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; background: var(--color-bg-canvas); }
    .settings-group-title { font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 600; color: var(--color-text-accent); display: flex; align-items: center; justify-content: space-between; }
    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.6rem; }
    .settings-checkbox-card { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.65rem; background: var(--color-bg-elevated); border: var(--border-subtle); border-radius: var(--radius-xs); cursor: pointer; transition: all 0.15s ease; }
    .settings-checkbox-card:hover { border-color: var(--color-gray-500); }
    .settings-checkbox-card input[type="checkbox"] { cursor: pointer; accent-color: var(--color-green-400); width: 15px; height: 15px; }
    .settings-checkbox-card label { cursor: pointer; font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-text-primary); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .settings-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .settings-label { font-size: 0.8125rem; color: var(--color-text-primary); font-weight: 500; }
    .settings-sublabel { font-size: 0.75rem; color: var(--color-text-muted); }
    
    .code-box { background: var(--color-bg-canvas); border: var(--border-default); padding: 0.75rem; font-family: var(--font-mono); font-size: 0.75rem; border-radius: var(--radius-xs); word-break: break-all; white-space: pre-wrap; color: var(--color-text-secondary); line-height: 1.6; }
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
        <span class="nav-link is-active" id="nav-link-search">Search</span>
        <span class="nav-link" id="nav-link-bookmarks">⭐ Bookmarks</span>
        <a href="#invariants" class="nav-link" id="nav-link-invariants">Invariants</a>
      </div>

      <div class="nav-actions">
        <select id="select-global-lang" class="select-input" title="Language Selector">
          <option value="vi">🇻🇳 Tiếng Việt</option>
          <option value="en">🇺🇸 English</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="id">🇮🇩 Bahasa Indonesia</option>
        </select>
        <button type="button" id="btn-toggle-theme" class="button button--sm">Theme: Dark</button>
        <button type="button" id="btn-open-settings" class="button button--sm button--primary">⚙ Settings</button>
      </div>
    </div>
  </nav>

  <main class="page-shell">
    
    <header class="hero-zone">
      <h1 class="hero-subtitle">
        <span id="hero-sub-pre">There are many torrent searchers,</span><br>
        <span id="hero-sub-post">but this one is </span><span class="hero-subtitle-cherry">Cherry</span><span class="hero-subtitle-accent">Tor</span>.
      </h1>
      <p class="hero-orient" id="hero-orient-text">
        Minimal, security-first metadata aggregator. Zero arbitrary proxying, strict typed upstream registries, and deterministic multi-signal ranking.
      </p>
    </header>

    <section class="search-switcher-box" id="search">
      <div class="switcher-tabs">
        <button type="button" class="switcher-tab is-active filter-chip" data-category="ALL" id="tab-all">All Categories</button>
        <button type="button" class="switcher-tab filter-chip" data-category="MOVIES" id="tab-movies">🎬 Movies</button>
        <button type="button" class="switcher-tab filter-chip" data-category="ANIME" id="tab-anime">🌸 Anime &amp; Drama</button>
        <button type="button" class="switcher-tab filter-chip" data-category="SOFTWARE" id="tab-software">💻 Software &amp; OS</button>
        <button type="button" class="switcher-tab filter-chip" data-category="GAMES" id="tab-games">🎮 Games</button>
        <button type="button" class="switcher-tab filter-chip" data-category="BOOKS" id="tab-books">📚 Books &amp; Texts</button>
        <button type="button" class="switcher-tab filter-chip" data-category="MUSIC" id="tab-music">🎵 Music &amp; Audio</button>
        <button type="button" class="switcher-tab filter-chip" data-category="BOOKMARKS" id="tab-bookmarks">⭐ Bookmarks (<span id="bookmark-count-tab">0</span>)</button>
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
        <span class="search-shortcut-tag" id="search-shortcut-tag">[/] focus</span>
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
          <span id="caption-feed-title">Verified Swarm Metadata Feed</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span id="result-count">0 items</span>
          <span id="search-latency">0 ms</span>
        </div>
      </div>

      <!-- Feeds Selector Toolbar -->
      <div class="frame-toolbar" id="providers">
        <div class="feeds-pills" id="provider-toggles"></div>
        <div>
          <span id="active-provider-count" class="badge badge-accent">15 Active</span>
        </div>
      </div>

      <!-- Sorter & Filter Sub-Toolbar -->
      <div class="controls-toolbar">
        <div class="filter-controls-group">
          <span style="color:var(--color-text-muted);" id="label-sort-by">Sort by:</span>
          <select id="select-sort-order" class="select-input">
            <option value="seeders_desc">Seeders ↓ (Highest)</option>
            <option value="size_desc">Size ↓ (Largest)</option>
            <option value="size_asc">Size ↑ (Smallest)</option>
            <option value="date_desc">Date ↓ (Newest)</option>
            <option value="title_asc">Title (A → Z)</option>
          </select>

          <label class="filter-checkbox-label">
            <input type="checkbox" id="chk-hide-dead" />
            <span id="label-hide-dead">Hide dead torrents (0 Seeders)</span>
          </label>
        </div>

        <div style="color:var(--color-text-muted); font-size:0.6875rem;" id="toolbar-click-tip">
          💡 Click row to inspect detailed metadata &amp; trackers
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 4%;">⭐</th>
              <th style="width: 40%;" id="th-title">Title / Release</th>
              <th style="width: 14%;" id="th-category">Category</th>
              <th style="width: 12%;" id="th-size">Size</th>
              <th style="width: 10%;" id="th-swarm">Swarm</th>
              <th style="width: 10%;" id="th-health">Health</th>
              <th style="width: 10%;" id="th-date">Date</th>
              <th style="text-align: right; width: 10%;" id="th-action">Action</th>
            </tr>
          </thead>
          <tbody id="results-tbody">
            <tr>
              <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">
                READY TO QUERY LIVE SWARMS<br>
                <span style="font-size: 0.75rem; color: var(--color-gray-600);">Type a search term above to aggregate verified torrent metadata.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="invariants" style="margin-top: 1rem;">
      <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;" id="invariants-title">Core Security Invariants (INV-01 — INV-10)</h2>
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

      const TRANSLATIONS = {
        vi: {
          nav_search: 'Tìm kiếm',
          nav_bookmarks: '⭐ Đã lưu',
          nav_invariants: 'Bảo mật',
          btn_theme_dark: 'Giao diện: Tối',
          btn_theme_light: 'Giao diện: Sáng',
          btn_settings: '⚙ Cài đặt',
          hero_sub_pre: 'Có rất nhiều công cụ tìm kiếm torrent,',
          hero_sub_post: 'nhưng đây là ',
          hero_orient: 'Công cụ tổng hợp siêu dữ liệu P2P tối giản, ưu tiên bảo mật. Không proxy tùy tiện, định tuyến theo nguồn tĩnh đã kiểm định.',
          tab_all: 'Tất cả chuyên mục',
          tab_movies: '🎬 Phim ảnh',
          tab_anime: '🌸 Anime & Drama',
          tab_software: '💻 Phần mềm / OS',
          tab_games: '🎮 Trò chơi / Games',
          tab_books: '📚 Sách & Ebooks',
          tab_music: '🎵 Âm nhạc / FLAC',
          tab_bookmarks: '⭐ Đã lưu',
          search_placeholder: "Nhập từ khóa tìm kiếm (ví dụ: 'avatar', '鬼灭', 'ubuntu', 'elden ring')...",
          search_btn: 'Tìm kiếm',
          focus_tag: '[/] Tiêu điểm',
          caption_title: 'DÒNG SIÊU DỮ LIỆU ĐÃ KIỂM CHỨNG',
          active_providers_suffix: 'Hoạt động',
          label_sort_by: 'Sắp xếp theo:',
          sort_seeders: 'Seeders ↓ (Nhiều nhất)',
          sort_size_desc: 'Dung lượng ↓ (Lớn nhất)',
          sort_size_asc: 'Dung lượng ↑ (Nhỏ nhất)',
          sort_date_desc: 'Ngày đăng ↓ (Mới nhất)',
          sort_title_asc: 'Tiêu đề (A → Z)',
          label_hide_dead: 'Ẩn torrent chết (0 Seeders)',
          toolbar_tip: '💡 Bấm vào dòng để soi chi tiết siêu dữ liệu & trackers',
          th_title: 'Tiêu đề / Bản phát hành',
          th_category: 'Chuyên mục',
          th_size: 'Dung lượng',
          th_swarm: 'Swarm (Seed/Peer)',
          th_health: 'Trạng thái',
          th_date: 'Ngày đăng',
          th_action: 'Thao tác',
          state_ready: 'SẴN SÀNG TÌM KIẾM TRỰC TIẾP',
          state_ready_desc: 'Nhập từ khóa ở trên để tìm kiếm siêu dữ liệu torrent an toàn.',
          state_searching: 'ĐANG TÌM KIẾM CÁC NGUỒN...',
          state_searching_desc: 'Đang truy vấn song song các nhà cung cấp được duyệt...',
          state_empty: 'KHÔNG TÌM THẤY KẾT QUẢ',
          state_empty_desc: 'Hãy thử đổi từ khóa hoặc bật thêm nhà cung cấp trong cài đặt.',
          state_bookmarks_empty: 'CHƯA CÓ TORRENT NÀO ĐƯỢC LƯU',
          state_bookmarks_empty_desc: 'Bấm biểu tượng ⭐ ở bất kỳ kết quả nào để lưu ngoại tuyến.',
          toast_copied: '✓ Đã sao chép liên kết Magnet!',
          toast_copied_hash: '✓ Đã sao chép InfoHash!',
          toast_bookmarked: '⭐ Đã lưu vào danh sách yêu thích!',
          toast_unbookmarked: '✓ Đã xóa khỏi danh sách đã lưu.',
          toast_cached: '✓ Đã xóa sạch bộ nhớ cache!',
          toast_reset: '✓ Đã khôi phục cài đặt mặc định!',
          toast_at_least_one: 'Ít nhất 1 nguồn phải được bật!',
          modal_title: '⚙ CÀI ĐẶT & QUẢN LÝ NHÀ CUNG CẤP',
          modal_inspector_title: '🔍 BỘ SOI CHI TIẾT SIÊU DỮ LIỆU TORRENT',
          sec_lang: '🌐 Ngôn Ngữ Giao Diện (Language)',
          sec_lang_desc: 'Chọn ngôn ngữ hiển thị cho ứng dụng',
          sec_asian_movies: '🌸 Phim Châu Á & Anime',
          sec_global_movies: '🎬 Phim Điện Ảnh & Toàn Cầu',
          sec_software: '💻 Phần Mềm & Hệ Điều Hành',
          sec_games: '🎮 Trò Chơi (PC Games / Repacks)',
          sec_books: '📚 Sách & Tài Liệu Ebook',
          sec_music: '🎵 Âm Nhạc & Lossless Audio',
          sec_density: '🎨 Giao Diện & Mật Độ Hiển Thị',
          density_label: 'Mật độ hiển thị bảng',
          density_compact: 'Compact (Dày đặc)',
          density_comfortable: 'Comfortable (Rộng rãi)',
          sec_safe_mode: '🛡️ Chế Độ An Toàn & Lọc NSFW',
          safe_mode_label: 'Kích hoạt Safe Mode (Tự động ẩn nội dung 18+)',
          sec_torznab: '🔌 Tích Hợp Máy Chủ Riêng (Torznab / Jackett / Prowlarr)',
          torznab_desc: 'Kết nối máy chủ Torznab cá nhân để tìm kiếm qua Private Trackers',
          sec_privacy: '🛡️ Quyền Riêng Tư & Bộ Nhớ Cache',
          privacy_desc: 'Không lưu trữ cookie theo dõi hay proxy trái phép (INV-01 / INV-08).',
          btn_purge_cache: 'Xóa Cache & Lịch Sử',
          btn_export_bm: 'Xuất Bookmark (JSON)',
          btn_import_bm: 'Nhập Bookmark (JSON)',
          btn_reset: 'Khôi Phục Mặc Định',
          btn_done: 'Hoàn Tất',
          btn_open_client: 'Mở Ứng Dụng Torrent'
        },
        en: {
          nav_search: 'Search',
          nav_bookmarks: '⭐ Bookmarks',
          nav_invariants: 'Invariants',
          btn_theme_dark: 'Theme: Dark',
          btn_theme_light: 'Theme: Light',
          btn_settings: '⚙ Settings',
          hero_sub_pre: 'There are many torrent searchers,',
          hero_sub_post: 'but this one is ',
          hero_orient: 'Minimal, security-first metadata aggregator. Zero arbitrary proxying, strict typed upstream registries, and deterministic multi-signal ranking.',
          tab_all: 'All Categories',
          tab_movies: '🎬 Movies',
          tab_anime: '🌸 Anime & Drama',
          tab_software: '💻 Software & OS',
          tab_games: '🎮 Games',
          tab_books: '📚 Books & Texts',
          tab_music: '🎵 Music & Audio',
          tab_bookmarks: '⭐ Bookmarks',
          search_placeholder: "Type query to search metadata (e.g. 'avatar', '鬼灭', 'ubuntu', 'elden ring')...",
          search_btn: 'Search',
          focus_tag: '[/] focus',
          caption_title: 'VERIFIED SWARM METADATA FEED',
          active_providers_suffix: 'Active',
          label_sort_by: 'Sort by:',
          sort_seeders: 'Seeders ↓ (Highest)',
          sort_size_desc: 'Size ↓ (Largest)',
          sort_size_asc: 'Size ↑ (Smallest)',
          sort_date_desc: 'Date ↓ (Newest)',
          sort_title_asc: 'Title (A → Z)',
          label_hide_dead: 'Hide dead torrents (0 Seeders)',
          toolbar_tip: '💡 Click any row to inspect metadata & trackers',
          th_title: 'Title / Release',
          th_category: 'Category',
          th_size: 'Size',
          th_swarm: 'Swarm (Seed/Peer)',
          th_health: 'Health',
          th_date: 'Date',
          th_action: 'Action',
          state_ready: 'READY TO QUERY LIVE SWARMS',
          state_ready_desc: 'Type a search term above to aggregate verified torrent metadata.',
          state_searching: 'SEARCHING LIVE FEEDS...',
          state_searching_desc: 'Querying approved server-side upstream registries in parallel...',
          state_empty: 'NO METADATA RETURNED',
          state_empty_desc: 'Try adjusting your query or enabling more upstream providers in settings.',
          state_bookmarks_empty: 'NO SAVED BOOKMARKS YET',
          state_bookmarks_empty_desc: 'Click the ⭐ icon on any result to bookmark it offline.',
          toast_copied: '✓ Magnet link copied!',
          toast_copied_hash: '✓ InfoHash copied!',
          toast_bookmarked: '⭐ Torrent bookmarked successfully!',
          toast_unbookmarked: '✓ Removed from bookmarks.',
          toast_cached: '✓ Cache purged successfully!',
          toast_reset: '✓ Default settings restored!',
          toast_at_least_one: 'At least 1 provider must be active!',
          modal_title: '⚙ ENGINE SETTINGS & PROVIDER REGISTRY',
          modal_inspector_title: '🔍 TORRENT METADATA INSPECTOR',
          sec_lang: '🌐 Display Language',
          sec_lang_desc: 'Select preferred user interface language',
          sec_asian_movies: '🌸 Asian Movies & Anime',
          sec_global_movies: '🎬 Movies & Global Series',
          sec_software: '💻 Software & Operating Systems',
          sec_games: '🎮 Games (PC / Repacks)',
          sec_books: '📚 Books & Texts',
          sec_music: '🎵 Music & Hi-Res Audio',
          sec_density: '🎨 Interface & Display Density',
          density_label: 'Table row spacing density',
          density_compact: 'Compact',
          density_comfortable: 'Comfortable',
          sec_safe_mode: '🛡️ Safe Mode & NSFW Filter',
          safe_mode_label: 'Enable Safe Mode (Filter adult & NSFW content)',
          sec_torznab: '🔌 Custom Private Indexer (Torznab / Jackett)',
          torznab_desc: 'Connect your self-hosted Jackett/Prowlarr server for private trackers',
          sec_privacy: '🛡️ Privacy Controls & Local Cache',
          privacy_desc: 'Zero persistent tracking cookies or unauthorized proxying (INV-01 / INV-08).',
          btn_purge_cache: 'Purge Cache & History',
          btn_export_bm: 'Export Bookmarks (JSON)',
          btn_import_bm: 'Import Bookmarks (JSON)',
          btn_reset: 'Reset All Defaults',
          btn_done: 'Done',
          btn_open_client: 'Open in Torrent Client'
        },
        zh: {
          nav_search: '搜索',
          nav_bookmarks: '⭐ 我的收藏',
          nav_invariants: '安全约束',
          btn_theme_dark: '主题: 深色',
          btn_theme_light: '主题: 浅色',
          btn_settings: '⚙ 设置',
          hero_sub_pre: '世上有许多种子搜索工具，',
          hero_sub_post: '但这是唯一的 ',
          hero_orient: '极简且安全优先的元数据聚合器。零任意代理、严格类型化上游源注册表、确定性多信号排序。',
          tab_all: '全部分类',
          tab_movies: '🎬 电影与影视',
          tab_anime: '🌸 动漫与亚洲剧集',
          tab_software: '💻 软件与操作系统',
          tab_games: '🎮 游戏专区',
          tab_books: '📚 书籍与文献',
          tab_music: '🎵 音乐与无损',
          tab_bookmarks: '⭐ 我的收藏',
          search_placeholder: "输入搜索关键词 (例如: 'avatar', '鬼灭', 'ubuntu', 'elden ring')...",
          search_btn: '搜索',
          focus_tag: '[/] 聚焦',
          caption_title: '已验证群集元数据源',
          active_providers_suffix: '个已启用',
          label_sort_by: '排序方式:',
          sort_seeders: '做种数 ↓ (从多到少)',
          sort_size_desc: '文件大小 ↓ (从大到小)',
          sort_size_asc: '文件大小 ↑ (从小到大)',
          sort_date_desc: '发布日期 ↓ (最新发布)',
          sort_title_asc: '标题 (A → Z)',
          label_hide_dead: '隐藏无做种死种 (0 Seeders)',
          toolbar_tip: '💡 点击任意数据行即可查看完整元数据与 Tracker 列表',
          th_title: '标题 / 发布版本',
          th_category: '分类',
          th_size: '文件大小',
          th_swarm: '做种/下载 (Seed/Peer)',
          th_health: '状态',
          th_date: '发布日期',
          th_action: '操作',
          state_ready: '准备查询实时群集',
          state_ready_desc: '在上方输入关键词以聚合安全验证的种子元数据。',
          state_searching: '正在并行搜索上游数据源...',
          state_searching_desc: '正在并发查询所有已核准的服务端上游注册源...',
          state_empty: '未检索到相关元数据',
          state_empty_desc: '请尝试修改搜索词或在设置中启用更多数据源。',
          state_bookmarks_empty: '暂无收藏的种子资源',
          state_bookmarks_empty_desc: '在任意搜索结果行点击 ⭐ 即可离线保存。',
          toast_copied: '✓ 已成功复制磁力链接！',
          toast_copied_hash: '✓ 已复制 InfoHash！',
          toast_bookmarked: '⭐ 已成功添加到收藏列表！',
          toast_unbookmarked: '✓ 已从收藏列表中移除。',
          toast_cached: '✓ 已成功清除本地缓存！',
          toast_reset: '✓ 已恢复默认设置！',
          toast_at_least_one: '至少必须保留一个激活的数据源！',
          modal_title: '⚙ 引擎设置与数据源管理',
          modal_inspector_title: '🔍 种子元数据深度检查器',
          sec_lang: '🌐 界面语言 (Language)',
          sec_lang_desc: '选择应用程序显示语言',
          sec_asian_movies: '🌸 亚洲影视与动漫',
          sec_global_movies: '🎬 院线电影与全球剧集',
          sec_software: '💻 软件与操作系统',
          sec_games: '🎮 电脑游戏与精简压制',
          sec_books: '📚 书籍与电子文档',
          sec_music: '🎵 音乐与无损母带',
          sec_density: '🎨 界面外观与表格密度',
          density_label: '表格行距间隙密度',
          density_compact: 'Compact (紧凑紧密)',
          density_comfortable: 'Comfortable (舒适宽敞)',
          sec_safe_mode: '🛡️ 安全模式与 NSFW 过滤',
          safe_mode_label: '开启安全模式 (自动过滤成人与敏感内容)',
          sec_torznab: '🔌 自定义私有索引器 (Torznab / Jackett)',
          torznab_desc: '连接您的私有 Jackett/Prowlarr 服务器以检索 Private Tracker',
          sec_privacy: '🛡️ 隐私保护与本地缓存',
          privacy_desc: '不保留任何追踪 Cookie，不执行任何未经授权的开放代理 (INV-01 / INV-08)。',
          btn_purge_cache: '清除缓存与历史',
          btn_export_bm: '导出收藏 (JSON)',
          btn_import_bm: '导入收藏 (JSON)',
          btn_reset: '恢复默认设置',
          btn_done: '完成',
          btn_open_client: '调用本地客户端打开'
        },
        ja: {
          nav_search: '検索',
          nav_bookmarks: '⭐ ブックマーク',
          nav_invariants: 'セキュリティ規約',
          btn_theme_dark: 'テーマ: ダーク',
          btn_theme_light: 'テーマ: ライト',
          btn_settings: '⚙ 設定',
          hero_sub_pre: '世の中に多くのTorrent検索がありますが、',
          hero_sub_post: 'これが真の ',
          hero_orient: 'ミニマルでセキュリティ最優先のメタデータアグリゲーター。任意プロキシなし、厳密な上流レジストリ、多角的決定論的ランキング。',
          tab_all: 'すべてのカテゴリ',
          tab_movies: '🎬 映画・映像',
          tab_anime: '🌸 アニメ・アジアドラマ',
          tab_software: '💻 ソフトウェア・OS',
          tab_games: '🎮 ゲーム',
          tab_books: '📚 書籍・電子書籍',
          tab_music: '🎵 音楽・ハイレゾ',
          tab_bookmarks: '⭐ ブックマーク',
          search_placeholder: "キーワードを入力 (例: 'avatar', '鬼灭', 'ubuntu', 'elden ring')...",
          search_btn: '検索',
          focus_tag: '[/] フォーカス',
          caption_title: '検証済みスウォーム メタデータ',
          active_providers_suffix: '件有効',
          label_sort_by: '並び順:',
          sort_seeders: 'シード数 ↓ (多い順)',
          sort_size_desc: 'ファイルサイズ ↓ (大きい順)',
          sort_size_asc: 'ファイルサイズ ↑ (小さい順)',
          sort_date_desc: '登録日 ↓ (新しい順)',
          sort_title_asc: 'タイトル (A → Z)',
          label_hide_dead: 'シード0の無効Torrentを隠す',
          toolbar_tip: '💡 行をクリックすると詳細情報とトラッカーを表示します',
          th_title: 'タイトル / リリース',
          th_category: 'カテゴリ',
          th_size: 'サイズ',
          th_swarm: 'シード / ピア',
          th_health: '状態',
          th_date: '登録日',
          th_action: '操作',
          state_ready: 'リアルタイム検索の準備完了',
          state_ready_desc: '上で検索語を入力すると、検証済みのメタデータを集約します。',
          state_searching: '各ソースから並行検索中...',
          state_searching_desc: '承認済みの上流レジストリへ高速並行クエリを実行しています...',
          state_empty: '該当するメタデータが見つかりませんでした',
          state_empty_desc: 'キーワードを変更するか、設定から有効なソースを追加してください。',
          state_bookmarks_empty: '保存されたブックマークはありません',
          state_bookmarks_empty_desc: '行の ⭐ アイコンをクリックすると保存できます。',
          toast_copied: '✓ マグネットリンクをコピーしました！',
          toast_copied_hash: '✓ InfoHashをコピーしました！',
          toast_bookmarked: '⭐ ブックマークに追加しました！',
          toast_unbookmarked: '✓ ブックマークから削除しました。',
          toast_cached: '✓ キャッシュを正常にクリアしました！',
          toast_reset: '✓ デフォルト設定に戻しました！',
          toast_at_least_one: '少なくとも1つのプロバイダを有効にしてください！',
          modal_title: '⚙ エンジン設定とプロバイダー管理',
          modal_inspector_title: '🔍 Torrentメタデータ詳細インスペクター',
          sec_lang: '🌐 表示言語 (Language)',
          sec_lang_desc: 'ユーザーインターフェースの言語を選択',
          sec_asian_movies: '🌸 アジア映画・アニメ',
          sec_global_movies: '🎬 映画・海外ドラマ',
          sec_software: '💻 ソフトウェア・OS',
          sec_games: '🎮 PCゲーム・リパック',
          sec_books: '📚 書籍・電子書籍',
          sec_music: '🎵 音楽・ロスレス音源',
          sec_density: '🎨 デザイン・表示密度',
          density_label: 'テーブルの行間密度',
          density_compact: 'コンパクト (密集)',
          density_comfortable: '標準 (快適)',
          sec_safe_mode: '🛡️ セーフモード & NSFWフィルター',
          safe_mode_label: 'セーフモードを有効にする (成人向けコンテンツを除外)',
          sec_torznab: '🔌 カスタムTorznab連携 (Jackett / Prowlarr)',
          torznab_desc: 'プライベートトラッカー検索用の個人サーバーを接続',
          sec_privacy: '🛡️ プライバシー保護・キャッシュ管理',
          privacy_desc: '追跡クッキーなし、不正なオープンプロキシ完全拒否 (INV-01 / INV-08)。',
          btn_purge_cache: 'キャッシュと履歴を消去',
          btn_export_bm: 'ブックマークを出力 (JSON)',
          btn_import_bm: 'ブックマークを読込 (JSON)',
          btn_reset: '初期設定にリセット',
          btn_done: '完了',
          btn_open_client: 'Torrentクライアントで開く'
        },
        ko: {
          nav_search: '검색',
          nav_bookmarks: '⭐ 북마크',
          nav_invariants: '보안 규약',
          btn_theme_dark: '테마: 다크',
          btn_theme_light: '테마: 라이트',
          btn_settings: '⚙ 설정',
          hero_sub_pre: '수많은 토렌트 검색기가 있지만,',
          hero_sub_post: '이것이 진정한 ',
          hero_orient: '미니멀하고 보안 우선의 메타데이터 수집 엔진. 임의 프록시 배제, 엄격한 상위 레지스트리 및 결정론적 랭킹 알고리즘.',
          tab_all: '전체 카테고리',
          tab_movies: '🎬 영화 / 영상',
          tab_anime: '🌸 애니 & 아시아 드라마',
          tab_software: '💻 소프트웨어 & OS',
          tab_games: '🎮 게임',
          tab_books: '📚 도서 & 텍스트',
          tab_music: '🎵 음악 & 무손실',
          tab_bookmarks: '⭐ 북마크',
          search_placeholder: "검색어를 입력하세요 (예: 'avatar', '鬼灭', 'ubuntu', 'elden ring')...",
          search_btn: '검색',
          focus_tag: '[/] 포커스',
          caption_title: '검증된 스웜 메타데이터 피드',
          active_providers_suffix: '개 활성화됨',
          label_sort_by: '정렬 기준:',
          sort_seeders: '시드 수 ↓ (많은 순)',
          sort_size_desc: '파일 크기 ↓ (큰 순)',
          sort_size_asc: '파일 크기 ↑ (작은 순)',
          sort_date_desc: '게시일 ↓ (최신 순)',
          sort_title_asc: '제목 (A → Z)',
          label_hide_dead: '시드 0개 토렌트 숨기기',
          toolbar_tip: '💡 항목을 클릭하면 상세 메타데이터와 트래커를 확인할 수 있습니다',
          th_title: '제목 / 릴리즈',
          th_category: '카테고리',
          th_size: '용량',
          th_swarm: '시드 / 피어 (Seed/Peer)',
          th_health: '상태',
          th_date: '게시일',
          th_action: '작업',
          state_ready: '실시간 검색 준비 완료',
          state_ready_desc: '상단에 검색어를 입력하여 검증된 토렌트 메타데이터를 검색하세요.',
          state_searching: '상위 소스 실시간 검색 중...',
          state_searching_desc: '승인된 상위 레지스트리에 병렬로 안전하게 쿼리하고 있습니다...',
          state_empty: '검색 결과가 없습니다',
          state_empty_desc: '검색어를 변경하거나 설정에서 활성화된 제공자를 추가해 보세요.',
          state_bookmarks_empty: '저장된 북마크가 없습니다',
          state_bookmarks_empty_desc: '결과 목록에서 ⭐ 아이콘을 눌러 오프라인에 저장하세요.',
          toast_copied: '✓ 마그넷 링크가 복사되었습니다!',
          toast_copied_hash: '✓ InfoHash가 복사되었습니다!',
          toast_bookmarked: '⭐ 북마크에 추가되었습니다!',
          toast_unbookmarked: '✓ 북마크에서 제거되었습니다.',
          toast_cached: '✓ 캐시가 성공적으로 삭제되었습니다!',
          toast_reset: '✓ 기본 설정으로 초기화되었습니다!',
          toast_at_least_one: '최소 1개 이상의 제공자가 활성화되어야 합니다!',
          modal_title: '⚙ 엔진 설정 및 제공자 관리',
          modal_inspector_title: '🔍 토렌트 메타데이터 상세 검사기',
          sec_lang: '🌐 표시 언어 (Language)',
          sec_lang_desc: '사용자 인터페이스 언어 선택',
          sec_asian_movies: '🌸 아시아 영화 & 애니메이션',
          sec_global_movies: '🎬 영화 & 글로벌 시리즈',
          sec_software: '💻 소프트웨어 & 운영체제',
          sec_games: '🎮 PC 게임 & 리팩',
          sec_books: '📚 도서 & 전자책',
          sec_music: '🎵 음악 & 무손실 음원',
          sec_density: '🎨 인터페이스 & 테이블 밀도',
          density_label: '테이블 행 간격 밀도',
          density_compact: '컴팩트 (조밀하게)',
          density_comfortable: '기본 (여유있게)',
          sec_safe_mode: '🛡️ 세이프 모드 & 성인 필터',
          safe_mode_label: '세이프 모드 켜기 (성인/민감 콘텐츠 자동 숨김)',
          sec_torznab: '🔌 개인 인덱서 연결 (Torznab / Jackett)',
          torznab_desc: '개인 Jackett/Prowlarr 서버를 연결하여 프라이빗 트래커 검색',
          sec_privacy: '🛡️ 개인정보 보호 & 캐시 관리',
          privacy_desc: '추적 쿠키 없음, 비인가 오픈 프록시 완전 차단 (INV-01 / INV-08).',
          btn_purge_cache: '캐시 및 기록 삭제',
          btn_export_bm: '북마크 내보내기 (JSON)',
          btn_import_bm: '북마크 가져오기 (JSON)',
          btn_reset: '기본값으로 복원',
          btn_done: '완료',
          btn_open_client: '토렌트 클라이언트로 열기'
        },
        id: {
          nav_search: 'Pencarian',
          nav_bookmarks: '⭐ Tersimpan',
          nav_invariants: 'Invarian Keamanan',
          btn_theme_dark: 'Tema: Gelap',
          btn_theme_light: 'Tema: Terang',
          btn_settings: '⚙ Pengaturan',
          hero_sub_pre: 'Ada banyak pencari torrent,',
          hero_sub_post: 'tetapi yang ini adalah ',
          hero_orient: 'Agregator metadata minimalis dan mengutamakan keamanan. Nol proksi sewenang-wenang, registri sumber ketat, dan pemeringkatan multi-sinyal.',
          tab_all: 'Semua Kategori',
          tab_movies: '🎬 Film',
          tab_anime: '🌸 Anime & Drama',
          tab_software: '💻 Perangkat Lunak & OS',
          tab_games: '🎮 Game',
          tab_books: '📚 Buku & Teks',
          tab_music: '🎵 Musik & Lossless',
          tab_bookmarks: '⭐ Tersimpan',
          search_placeholder: "Ketik kueri pencarian (contoh: 'avatar', '鬼灭', 'ubuntu', 'elden ring')...",
          search_btn: 'Cari',
          focus_tag: '[/] fokus',
          caption_title: 'UMPAN METADATA SWARM TERVERIFIKASI',
          active_providers_suffix: 'Aktif',
          label_sort_by: 'Urutkan:',
          sort_seeders: 'Seeders ↓ (Terbanyak)',
          sort_size_desc: 'Ukuran ↓ (Terbesar)',
          sort_size_asc: 'Ukuran ↑ (Terkecil)',
          sort_date_desc: 'Tanggal ↓ (Terbaru)',
          sort_title_asc: 'Judul (A → Z)',
          label_hide_dead: 'Sembunyikan torrent mati (0 Seeder)',
          toolbar_tip: '💡 Klik baris untuk memeriksa detail metadata & tracker',
          th_title: 'Judul / Rilis',
          th_category: 'Kategori',
          th_size: 'Ukuran',
          th_swarm: 'Swarm (Seed/Peer)',
          th_health: 'Status',
          th_date: 'Tanggal',
          th_action: 'Aksi',
          state_ready: 'SIAP MENCARI METADATA SWARM',
          state_ready_desc: 'Ketik kata kunci di atas untuk mencari metadata torrent terverifikasi.',
          state_searching: 'MENCARI DARI SUMBER RESMI...',
          state_searching_desc: 'Mengirimkan kueri secara paralel ke penyedia terdaftar...',
          state_empty: 'TIDAK ADA HASIL',
          state_empty_desc: 'Coba ubah kata kunci atau aktifkan lebih banyak penyedia di pengaturan.',
          state_bookmarks_empty: 'BELUM ADA TORRENT TERSIMPAN',
          state_bookmarks_empty_desc: 'Klik ikon ⭐ pada hasil mana pun untuk menyimpannya offline.',
          toast_copied: '✓ Tautan Magnet berhasil disalin!',
          toast_copied_hash: '✓ InfoHash berhasil disalin!',
          toast_bookmarked: '⭐ Berhasil ditambahkan ke daftar tersimpan!',
          toast_unbookmarked: '✓ Dihapus dari daftar tersimpan.',
          toast_cached: '✓ Cache lokal berhasil dibersihkan!',
          toast_reset: '✓ Pengaturan bawaan berhasil dipulihkan!',
          toast_at_least_one: 'Minimal 1 penyedia harus tetap aktif!',
          modal_title: '⚙ PENGATURAN MESIN & REGISTRI PENYEDIA',
          modal_inspector_title: '🔍 INSPEKTOR METADATA TORRENT',
          sec_lang: '🌐 Bahasa Tampilan (Language)',
          sec_lang_desc: 'Pilih bahasa antarmuka pengguna',
          sec_asian_movies: '🌸 Film Asia & Anime',
          sec_global_movies: '🎬 Film Bioskop & Serial Global',
          sec_software: '💻 Perangkat Lunak & OS',
          sec_games: '🎮 Game PC & Repack',
          sec_books: '📚 Buku & Dokumen Teks',
          sec_music: '🎵 Musik & Audio Lossless',
          sec_density: '🎨 Antarmuka & Kepadatan Baris',
          density_label: 'Kepadatan baris tabel',
          density_compact: 'Kompak (Rapat)',
          density_comfortable: 'Nyaman (Bawaan)',
          sec_safe_mode: '🛡️ Mode Aman & Filter NSFW',
          safe_mode_label: 'Aktifkan Mode Aman (Saring konten dewasa & 18+)',
          sec_torznab: '🔌 Integrasi Server Pribadi (Torznab / Jackett)',
          torznab_desc: 'Hubungkan server Jackett/Prowlarr untuk private tracker',
          sec_privacy: '🛡️ Privasi & Manajemen Cache',
          privacy_desc: 'Nol cookie pelacak dan nol proksi tidak sah (INV-01 / INV-08).',
          btn_purge_cache: 'Bersihkan Cache & Riwayat',
          btn_export_bm: 'Ekspor Tersimpan (JSON)',
          btn_import_bm: 'Impor Tersimpan (JSON)',
          btn_reset: 'Kembalikan Pengaturan Awal',
          btn_done: 'Selesai',
          btn_open_client: 'Buka di Klien Torrent'
        }
      };

      const ALL_CATEGORIZED_PROVIDERS = [
        // Phim & Phim Châu Á (Asian & Global Movies / Dramas)
        { id: 'apibay', name: 'ThePirateBay (Global)', catKey: 'sec_global_movies', icon: '🎬' },
        { id: 'dmhy', name: '动漫花园 DMHY (中文/亚洲影视)', catKey: 'sec_asian_movies', icon: '🌸' },
        { id: 'nyaa', name: 'Nyaa (Asian & Global Media)', catKey: 'sec_asian_movies', icon: '🌸' },
        { id: 'acg-rip', name: 'ACG.RIP (中文影视社区)', catKey: 'sec_asian_movies', icon: '🌸' },
        { id: 'bangumi', name: '萌番组 Bangumi (亚洲动画/剧集)', catKey: 'sec_asian_movies', icon: '🌸' },
        { id: 'tokyotosho', name: 'Tokyo Toshokan (Asian Media)', catKey: 'sec_asian_movies', icon: '🌸' },
        { id: 'yts', name: 'YTS (Movies HD/4K)', catKey: 'sec_global_movies', icon: '🎬' },
        { id: 'eztv', name: 'EZTV (TV Series & Shows)', catKey: 'sec_global_movies', icon: '📺' },
        { id: 'solidtorrents', name: 'SolidTorrents (DHT)', catKey: 'sec_global_movies', icon: '🌐' },

        // Phần mềm & OS
        { id: 'linuxtracker', name: 'LinuxTracker (Linux OS)', catKey: 'sec_software', icon: '💻' },
        { id: 'archive-org-software', name: 'Archive.org Software (Tools/ISO)', catKey: 'sec_software', icon: '💻' },

        // Trò chơi (Games)
        { id: 'fitgirl', name: 'FitGirl Repacks (PC Games)', catKey: 'sec_games', icon: '🎮' },
        { id: 'dodi', name: 'DODI Repacks (PC Games)', catKey: 'sec_games', icon: '🎮' },

        // Sách & Tài liệu
        { id: 'archive-org-texts', name: 'Archive.org Texts (Books/Ebooks)', catKey: 'sec_books', icon: '📚' },

        // Âm nhạc & Audio Hi-Res
        { id: 'archive-org-audio', name: 'Archive.org Audio (FLAC/Hi-Res)', catKey: 'sec_music', icon: '🎵' }
      ];

      // Load persistent state from localStorage
      let initialBookmarks = [];
      try {
        initialBookmarks = JSON.parse(localStorage.getItem('cherrytor_bookmarks') || '[]');
      } catch {}

      const state = {
        query: '',
        selectedCategory: 'ALL',
        theme: localStorage.getItem('cherrytor_theme') || 'dark',
        lang: localStorage.getItem('cherrytor_lang') || 'vi',
        density: localStorage.getItem('cherrytor_density') || 'comfortable',
        sortOrder: 'seeders_desc',
        hideDead: false,
        safeMode: localStorage.getItem('cherrytor_safemode') === 'true',
        torznabHost: localStorage.getItem('cherrytor_torznab_host') || '',
        torznabKey: localStorage.getItem('cherrytor_torznab_key') || '',
        enabledProviders: new Set(ALL_CATEGORIZED_PROVIDERS.map(p => p.id)),
        items: [],
        bookmarks: Array.isArray(initialBookmarks) ? initialBookmarks : [],
        isLoading: false
      };

      function t(key) {
        const dict = TRANSLATIONS[state.lang] || TRANSLATIONS['vi'];
        return dict[key] || TRANSLATIONS['en'][key] || key;
      }

      function saveBookmarks() {
        try {
          localStorage.setItem('cherrytor_bookmarks', JSON.stringify(state.bookmarks));
        } catch {}
        if (el.bookmarkCountTab) el.bookmarkCountTab.textContent = state.bookmarks.length;
      }

      const el = {
        langSelect: document.getElementById('select-global-lang'),
        searchInput: document.getElementById('search-input'),
        searchTriggerBtn: document.getElementById('btn-search-trigger'),
        searchShortcutTag: document.getElementById('search-shortcut-tag'),
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
        toast: document.getElementById('toast-notification'),
        
        navLinkSearch: document.getElementById('nav-link-search'),
        navLinkBookmarks: document.getElementById('nav-link-bookmarks'),
        navLinkInvariants: document.getElementById('nav-link-invariants'),
        heroSubPre: document.getElementById('hero-sub-pre'),
        heroSubPost: document.getElementById('hero-sub-post'),
        heroOrient: document.getElementById('hero-orient-text'),
        tabAll: document.getElementById('tab-all'),
        tabMovies: document.getElementById('tab-movies'),
        tabAnime: document.getElementById('tab-anime'),
        tabSoftware: document.getElementById('tab-software'),
        tabGames: document.getElementById('tab-games'),
        tabBooks: document.getElementById('tab-books'),
        tabMusic: document.getElementById('tab-music'),
        tabBookmarks: document.getElementById('tab-bookmarks'),
        bookmarkCountTab: document.getElementById('bookmark-count-tab'),
        captionFeedTitle: document.getElementById('caption-feed-title'),
        labelSortBy: document.getElementById('label-sort-by'),
        selectSortOrder: document.getElementById('select-sort-order'),
        chkHideDead: document.getElementById('chk-hide-dead'),
        labelHideDead: document.getElementById('label-hide-dead'),
        toolbarClickTip: document.getElementById('toolbar-click-tip'),
        thTitle: document.getElementById('th-title'),
        thCategory: document.getElementById('th-category'),
        thSize: document.getElementById('th-size'),
        thSwarm: document.getElementById('th-swarm'),
        thHealth: document.getElementById('th-health'),
        thDate: document.getElementById('th-date'),
        thAction: document.getElementById('th-action')
      };

      function applyTranslations() {
        document.documentElement.setAttribute('lang', state.lang);
        document.documentElement.setAttribute('data-theme', state.theme);
        if (el.langSelect) el.langSelect.value = state.lang;
        
        el.navLinkSearch.textContent = t('nav_search');
        el.navLinkBookmarks.textContent = t('nav_bookmarks');
        el.navLinkInvariants.textContent = t('nav_invariants');
        el.themeToggleBtn.textContent = state.theme === 'dark' ? t('btn_theme_dark') : t('btn_theme_light');
        el.settingsBtn.textContent = t('btn_settings');

        el.heroSubPre.textContent = t('hero_sub_pre');
        el.heroSubPost.textContent = t('hero_sub_post');
        el.heroOrient.textContent = t('hero_orient');

        el.tabAll.textContent = t('tab_all');
        el.tabMovies.textContent = t('tab_movies');
        el.tabAnime.textContent = t('tab_anime');
        el.tabSoftware.textContent = t('tab_software');
        el.tabGames.textContent = t('tab_games');
        el.tabBooks.textContent = t('tab_books');
        el.tabMusic.textContent = t('tab_music');
        el.tabBookmarks.innerHTML = t('tab_bookmarks') + ' (<span id="bookmark-count-tab">' + state.bookmarks.length + '</span>)';
        el.bookmarkCountTab = document.getElementById('bookmark-count-tab');

        el.searchInput.placeholder = t('search_placeholder');
        el.searchTriggerBtn.textContent = t('search_btn');
        el.searchShortcutTag.textContent = t('focus_tag');
        el.captionFeedTitle.textContent = t('caption_title');

        el.labelSortBy.textContent = t('label_sort_by');
        el.selectSortOrder.options[0].textContent = t('sort_seeders');
        el.selectSortOrder.options[1].textContent = t('sort_size_desc');
        el.selectSortOrder.options[2].textContent = t('sort_size_asc');
        el.selectSortOrder.options[3].textContent = t('sort_date_desc');
        el.selectSortOrder.options[4].textContent = t('sort_title_asc');
        el.labelHideDead.textContent = t('label_hide_dead');
        el.toolbarClickTip.textContent = t('toolbar_tip');

        el.thTitle.textContent = t('th_title');
        el.thCategory.textContent = t('th_category');
        el.thSize.textContent = t('th_size');
        el.thSwarm.textContent = t('th_swarm');
        el.thHealth.textContent = t('th_health');
        el.thDate.textContent = t('th_date');
        el.thAction.textContent = t('th_action');

        el.modalResetBtn.textContent = t('btn_reset');
        el.modalActionBtn.textContent = t('btn_done');
        el.modalTitle.textContent = t('modal_title');
        
        renderProviders();
        renderResults();
      }

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

      function isBookmarked(item) {
        return state.bookmarks.some(b => b.infoHash === item.infoHash || b.id === item.id);
      }

      function toggleBookmark(item, starBtn) {
        const index = state.bookmarks.findIndex(b => b.infoHash === item.infoHash || b.id === item.id);
        if (index > -1) {
          state.bookmarks.splice(index, 1);
          if (starBtn) {
            starBtn.classList.remove('is-bookmarked');
            starBtn.textContent = '☆';
          }
          showToast(t('toast_unbookmarked'));
        } else {
          state.bookmarks.push(item);
          if (starBtn) {
            starBtn.classList.add('is-bookmarked');
            starBtn.textContent = '⭐';
          }
          showToast(t('toast_bookmarked'));
        }
        saveBookmarks();
        if (state.selectedCategory === 'BOOKMARKS') {
          renderResults();
        }
      }

      function openInspectorModal(item) {
        el.modalTitle.textContent = t('modal_inspector_title');
        el.modalBody.replaceChildren();

        const contentDiv = document.createElement('div');
        contentDiv.style.cssText = 'display:flex; flex-direction:column; gap:1rem;';

        // Title & Badges
        const titleCard = document.createElement('div');
        titleCard.style.cssText = 'padding:1rem; background:var(--color-bg-canvas); border:var(--border-subtle); border-radius:var(--radius-sm);';
        titleCard.innerHTML = '<h2 style="font-size:1.05rem; font-weight:700; color:var(--color-text-primary); line-height:1.4; word-break:break-word;">' + item.title + '</h2>' +
          '<div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.65rem;">' +
            '<span class="badge badge-accent">' + (item.category || 'Other') + '</span>' +
            '<span class="badge">' + (item.sourceId || 'verified') + '</span>' +
            '<span class="badge badge-accent">● Verified RFC RFC-BTIH</span>' +
            (item.publishedAt ? '<span class="badge" style="font-family:var(--font-mono);">' + item.publishedAt.split('T')[0] + '</span>' : '') +
          '</div>';

        // Swarm & Size Details
        const metricsGrid = document.createElement('div');
        metricsGrid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem;';
        metricsGrid.innerHTML = 
          '<div style="padding:0.75rem; background:var(--color-bg-canvas); border:var(--border-subtle); border-radius:var(--radius-xs); text-align:center;">' +
            '<div style="font-size:0.6875rem; color:var(--color-text-muted); text-transform:uppercase;">Dung lượng (Size)</div>' +
            '<div style="font-size:1.15rem; font-weight:700; font-family:var(--font-mono); color:var(--color-text-primary); margin-top:0.25rem;">' + formatBytes(item.sizeBytes) + '</div>' +
          '</div>' +
          '<div style="padding:0.75rem; background:var(--color-bg-canvas); border:var(--border-subtle); border-radius:var(--radius-xs); text-align:center;">' +
            '<div style="font-size:0.6875rem; color:var(--color-text-muted); text-transform:uppercase;">Seeders (▲)</div>' +
            '<div style="font-size:1.15rem; font-weight:700; font-family:var(--font-mono); color:var(--color-text-accent); margin-top:0.25rem;">▲ ' + (item.seeders || 0) + '</div>' +
          '</div>' +
          '<div style="padding:0.75rem; background:var(--color-bg-canvas); border:var(--border-subtle); border-radius:var(--radius-xs); text-align:center;">' +
            '<div style="font-size:0.6875rem; color:var(--color-text-muted); text-transform:uppercase;">Leechers (▼)</div>' +
            '<div style="font-size:1.15rem; font-weight:700; font-family:var(--font-mono); color:var(--color-text-muted); margin-top:0.25rem;">▼ ' + (item.leechers || 0) + '</div>' +
          '</div>';

        // InfoHash Box
        const hashGroup = document.createElement('div');
        hashGroup.className = 'settings-group';
        hashGroup.innerHTML = '<div class="settings-group-title"><span>BTIH InfoHash (40-char Hex)</span><button type="button" id="btn-copy-hash" class="button button--sm">Copy Hash</button></div>' +
          '<div class="code-box">' + (item.infoHash || 'N/A') + '</div>';

        // Magnet URI Box & Direct Client Actions
        const magnetGroup = document.createElement('div');
        magnetGroup.className = 'settings-group';
        magnetGroup.innerHTML = '<div class="settings-group-title"><span>Magnet URI Specification</span><button type="button" id="btn-copy-magnet-full" class="button button--primary button--sm">Copy Magnet Link</button></div>' +
          '<div class="code-box" style="max-height:120px; overflow-y:auto;">' + (item.magnetUri || 'N/A') + '</div>' +
          '<div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.5rem;">' +
            '<a href="' + (item.magnetUri || '#') + '" class="button button--accent button--sm" target="_blank">' + t('btn_open_client') + ' ↗</a>' +
          '</div>';

        contentDiv.append(titleCard, metricsGrid, hashGroup, magnetGroup);
        el.modalBody.appendChild(contentDiv);

        setTimeout(() => {
          const copyHashBtn = document.getElementById('btn-copy-hash');
          if (copyHashBtn && item.infoHash) {
            copyHashBtn.addEventListener('click', () => {
              navigator.clipboard?.writeText(item.infoHash).catch(() => {});
              showToast(t('toast_copied_hash'));
            });
          }
          const copyMagBtn = document.getElementById('btn-copy-magnet-full');
          if (copyMagBtn && item.magnetUri) {
            copyMagBtn.addEventListener('click', () => {
              navigator.clipboard?.writeText(item.magnetUri).catch(() => {});
              showToast(t('toast_copied'));
            });
          }
        }, 50);

        el.modalBackdrop.classList.remove('is-hidden');
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
        el.activeProviderCount.textContent = state.enabledProviders.size + ' ' + t('active_providers_suffix');
      }

      function getProcessedItems() {
        let list = state.selectedCategory === 'BOOKMARKS' ? [...state.bookmarks] : [...state.items];

        // Safe Mode filter
        if (state.safeMode) {
          const nsfwRegex = /(xxx|porn|hentai|18\+|adult|erotic|r18|nsfw)/i;
          list = list.filter(item => !nsfwRegex.test(item.title));
        }

        // Hide dead torrents filter
        if (state.hideDead) {
          list = list.filter(item => (item.seeders || 0) > 0);
        }

        // Sorting
        if (state.sortOrder === 'seeders_desc') {
          list.sort((a, b) => (b.seeders || 0) - (a.seeders || 0));
        } else if (state.sortOrder === 'size_desc') {
          list.sort((a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0));
        } else if (state.sortOrder === 'size_asc') {
          list.sort((a, b) => (a.sizeBytes || 0) - (b.sizeBytes || 0));
        } else if (state.sortOrder === 'date_desc') {
          list.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
        } else if (state.sortOrder === 'title_asc') {
          list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        }

        return list;
      }

      function renderResults() {
        el.resultsBody.replaceChildren();
        
        if (state.isLoading) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 8;
          td.style.textAlign = 'center';
          td.style.padding = '3rem 1rem';
          td.style.color = 'var(--color-text-accent)';
          td.style.fontFamily = 'var(--font-mono)';
          td.innerHTML = '<span class="figure-caption-live-dot" style="display:inline-block; margin-right:0.5rem;"></span>' + t('state_searching') + '<br><span style="font-size:0.75rem; color:var(--color-gray-500);">' + t('state_searching_desc') + '</span>';
          tr.appendChild(td);
          el.resultsBody.appendChild(tr);
          return;
        }

        const displayItems = getProcessedItems();

        if (displayItems.length === 0) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 8;
          td.style.textAlign = 'center';
          td.style.padding = '3rem 1rem';
          td.style.color = 'var(--color-text-muted)';
          td.style.fontFamily = 'var(--font-mono)';
          
          if (state.selectedCategory === 'BOOKMARKS') {
            td.innerHTML = t('state_bookmarks_empty') + '<br><span style="font-size:0.75rem; color:var(--color-gray-600);">' + t('state_bookmarks_empty_desc') + '</span>';
          } else if (state.query.trim().length === 0) {
            td.innerHTML = t('state_ready') + '<br><span style="font-size:0.75rem; color:var(--color-gray-600);">' + t('state_ready_desc') + '</span>';
          } else {
            td.innerHTML = t('state_empty') + '<br><span style="font-size:0.75rem; color:var(--color-gray-600);">' + t('state_empty_desc') + '</span>';
          }
          
          tr.appendChild(td);
          el.resultsBody.appendChild(tr);
          el.resultCount.textContent = '0 items';
          return;
        }

        displayItems.forEach(item => {
          const tr = document.createElement('tr');
          tr.className = 'data-row';

          // Bookmark Star Column
          const tdStar = document.createElement('td');
          tdStar.style.textAlign = 'center';
          const starBtn = document.createElement('button');
          starBtn.type = 'button';
          starBtn.className = 'btn-bookmark ' + (isBookmarked(item) ? 'is-bookmarked' : '');
          starBtn.textContent = isBookmarked(item) ? '⭐' : '☆';
          starBtn.title = 'Bookmark';
          starBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBookmark(item, starBtn);
          });
          tdStar.appendChild(starBtn);

          // Title Column (Click to Inspect)
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
              showToast(t('toast_copied'));
            }
          });
          tdActions.appendChild(copyBtn);

          // Click on row to open Inspector Modal
          tr.addEventListener('click', () => openInspectorModal(item));

          tr.append(tdStar, tdTitle, tdCat, tdSize, tdSwarm, tdHealth, tdDate, tdActions);
          el.resultsBody.appendChild(tr);
        });

        el.resultCount.textContent = displayItems.length + ' items';
      }

      async function executeLiveSearch(query) {
        const trimmed = query.trim();
        if (state.selectedCategory === 'BOOKMARKS') {
          renderResults();
          return;
        }

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

        state.isLoading = false;
        el.searchLatency.textContent = (performance.now() - startTime).toFixed(1) + ' ms';
        renderResults();
      }

      function openSettingsModal() {
        el.modalTitle.textContent = t('modal_title');
        el.modalBody.replaceChildren();

        // 1. Language Section
        const langGroup = document.createElement('div');
        langGroup.className = 'settings-group';
        langGroup.innerHTML = '<div class="settings-group-title"><span>' + t('sec_lang') + '</span></div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">' + t('sec_lang_desc') + '</div></div>' +
            '<select id="modal-select-lang" class="select-input">' +
              '<option value="vi"' + (state.lang === 'vi' ? ' selected' : '') + '>🇻🇳 Tiếng Việt</option>' +
              '<option value="en"' + (state.lang === 'en' ? ' selected' : '') + '>🇺🇸 English</option>' +
              '<option value="zh"' + (state.lang === 'zh' ? ' selected' : '') + '>🇨🇳 中文</option>' +
              '<option value="ja"' + (state.lang === 'ja' ? ' selected' : '') + '>🇯🇵 日本語</option>' +
              '<option value="ko"' + (state.lang === 'ko' ? ' selected' : '') + '>🇰🇷 한국어</option>' +
              '<option value="id"' + (state.lang === 'id' ? ' selected' : '') + '>🇮🇩 Bahasa Indonesia</option>' +
            '</select>' +
          '</div>';
        el.modalBody.appendChild(langGroup);

        // 2. Providers Categorized
        const grouped = {};
        ALL_CATEGORIZED_PROVIDERS.forEach(p => {
          const categoryTitle = t(p.catKey);
          if (!grouped[categoryTitle]) grouped[categoryTitle] = [];
          grouped[categoryTitle].push(p);
        });

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
                  showToast(t('toast_at_least_one'));
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

        // 3. Safe Mode & NSFW
        const safeGroup = document.createElement('div');
        safeGroup.className = 'settings-group';
        safeGroup.innerHTML = '<div class="settings-group-title"><span>' + t('sec_safe_mode') + '</span></div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">' + t('safe_mode_label') + '</div></div>' +
            '<input type="checkbox" id="modal-chk-safemode"' + (state.safeMode ? ' checked' : '') + ' style="width:16px; height:16px; cursor:pointer; accent-color:var(--color-green-400);" />' +
          '</div>';
        el.modalBody.appendChild(safeGroup);

        // 4. Custom Torznab Indexer
        const torzGroup = document.createElement('div');
        torzGroup.className = 'settings-group';
        torzGroup.innerHTML = '<div class="settings-group-title"><span>' + t('sec_torznab') + '</span></div>' +
          '<div style="font-size:0.75rem; color:var(--color-text-muted);">' + t('torznab_desc') + '</div>' +
          '<input type="text" id="input-torznab-host" class="text-input" placeholder="http://127.0.0.1:9117/api/v2.0/indexers/all/results/torznab" value="' + state.torznabHost + '" />' +
          '<input type="password" id="input-torznab-key" class="text-input" placeholder="Torznab API Key" value="' + state.torznabKey + '" />';
        el.modalBody.appendChild(torzGroup);

        // 5. Interface & Density Section
        const uiGroup = document.createElement('div');
        uiGroup.className = 'settings-group';
        uiGroup.innerHTML = '<div class="settings-group-title"><span>' + t('sec_density') + '</span></div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">' + t('density_label') + '</div></div>' +
            '<select id="select-density" class="select-input">' +
              '<option value="compact"' + (state.density === 'compact' ? ' selected' : '') + '>' + t('density_compact') + '</option>' +
              '<option value="comfortable"' + (state.density === 'comfortable' ? ' selected' : '') + '>' + t('density_comfortable') + '</option>' +
            '</select>' +
          '</div>';
        el.modalBody.appendChild(uiGroup);

        // 6. Privacy, Bookmarks Export & Cache
        const privGroup = document.createElement('div');
        privGroup.className = 'settings-group';
        privGroup.innerHTML = '<div class="settings-group-title"><span>' + t('sec_privacy') + '</span></div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-sublabel">' + t('privacy_desc') + '</div></div>' +
            '<div style="display:flex; gap:0.5rem; flex-wrap:wrap;">' +
              '<button type="button" id="btn-export-bm" class="button button--sm">' + t('btn_export_bm') + '</button>' +
              '<button type="button" id="btn-clear-cache" class="button button--sm">' + t('btn_purge_cache') + '</button>' +
            '</div>' +
          '</div>';
        el.modalBody.appendChild(privGroup);

        setTimeout(() => {
          const modalLangSelect = document.getElementById('modal-select-lang');
          if (modalLangSelect) {
            modalLangSelect.addEventListener('change', (e) => {
              state.lang = e.target.value;
              localStorage.setItem('cherrytor_lang', state.lang);
              applyTranslations();
              openSettingsModal();
            });
          }

          const safeChk = document.getElementById('modal-chk-safemode');
          if (safeChk) {
            safeChk.addEventListener('change', (e) => {
              state.safeMode = e.target.checked;
              localStorage.setItem('cherrytor_safemode', String(state.safeMode));
              renderResults();
            });
          }

          const torzHost = document.getElementById('input-torznab-host');
          const torzKey = document.getElementById('input-torznab-key');
          if (torzHost) {
            torzHost.addEventListener('input', (e) => {
              state.torznabHost = e.target.value;
              localStorage.setItem('cherrytor_torznab_host', state.torznabHost);
            });
          }
          if (torzKey) {
            torzKey.addEventListener('input', (e) => {
              state.torznabKey = e.target.value;
              localStorage.setItem('cherrytor_torznab_key', state.torznabKey);
            });
          }

          const densitySelect = document.getElementById('select-density');
          if (densitySelect) {
            densitySelect.addEventListener('change', (e) => {
              state.density = e.target.value;
              localStorage.setItem('cherrytor_density', state.density);
              document.documentElement.style.setProperty('--result-row-padding-y', state.density === 'compact' ? '0.4rem' : '0.75rem');
            });
          }

          const exportBmBtn = document.getElementById('btn-export-bm');
          if (exportBmBtn) {
            exportBmBtn.addEventListener('click', () => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.bookmarks, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", "cherrytor_bookmarks.json");
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
              showToast('✓ Bookmarks exported to JSON!');
            });
          }

          const clearBtn = document.getElementById('btn-clear-cache');
          if (clearBtn) {
            clearBtn.addEventListener('click', () => {
              state.items = [];
              renderResults();
              showToast(t('toast_cached'));
            });
          }
        }, 50);

        el.modalBackdrop.classList.remove('is-hidden');
      }

      function closeSettingsModal() {
        el.modalBackdrop.classList.add('is-hidden');
      }

      function init() {
        applyTranslations();

        if (el.langSelect) {
          el.langSelect.addEventListener('change', (e) => {
            state.lang = e.target.value;
            localStorage.setItem('cherrytor_lang', state.lang);
            applyTranslations();
          });
        }

        el.selectSortOrder.addEventListener('change', (e) => {
          state.sortOrder = e.target.value;
          renderResults();
        });

        el.chkHideDead.addEventListener('change', (e) => {
          state.hideDead = e.target.checked;
          renderResults();
        });

        el.settingsBtn.addEventListener('click', openSettingsModal);
        el.modalCloseBtn.addEventListener('click', closeSettingsModal);
        el.modalActionBtn.addEventListener('click', closeSettingsModal);
        el.modalBackdrop.addEventListener('click', (e) => {
          if (e.target === el.modalBackdrop) closeSettingsModal();
        });

        el.modalResetBtn.addEventListener('click', () => {
          state.enabledProviders = new Set(ALL_CATEGORIZED_PROVIDERS.map(p => p.id));
          state.lang = 'vi';
          state.density = 'comfortable';
          state.safeMode = false;
          state.sortOrder = 'seeders_desc';
          state.hideDead = false;
          localStorage.removeItem('cherrytor_theme');
          localStorage.removeItem('cherrytor_lang');
          localStorage.removeItem('cherrytor_density');
          localStorage.removeItem('cherrytor_safemode');
          document.documentElement.style.setProperty('--result-row-padding-y', '0.75rem');
          applyTranslations();
          openSettingsModal();
          showToast(t('toast_reset'));
        });

        el.themeToggleBtn.addEventListener('click', () => {
          state.theme = state.theme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('cherrytor_theme', state.theme);
          document.documentElement.setAttribute('data-theme', state.theme);
          el.themeToggleBtn.textContent = state.theme === 'dark' ? t('btn_theme_dark') : t('btn_theme_light');
        });

        let timer;
        el.searchInput.addEventListener('input', (e) => {
          state.query = e.target.value;
          clearTimeout(timer);
          timer = setTimeout(() => executeLiveSearch(state.query), 350);
        });

        el.searchTriggerBtn.addEventListener('click', () => executeLiveSearch(el.searchInput.value));

        el.navLinkBookmarks.addEventListener('click', () => {
          document.querySelectorAll('.switcher-tab').forEach(b => b.classList.remove('is-active'));
          el.tabBookmarks.classList.add('is-active');
          state.selectedCategory = 'BOOKMARKS';
          renderResults();
        });

        document.querySelectorAll('.filter-chip').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            state.selectedCategory = btn.getAttribute('data-category') || 'ALL';
            if (state.selectedCategory === 'BOOKMARKS') {
              renderResults();
            } else if (state.query.trim().length > 0) {
              executeLiveSearch(state.query);
            } else {
              renderResults();
            }
          });
        });
      }

      init();
    })();
  </script>
</body>
</html>`;
}
