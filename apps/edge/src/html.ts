/**
 * Production HTML Embedded Renderer for CherryTor Edge Gateway
 * Massive Multi-Language Edition (20 Languages matching TorrentSearch)
 * vi, en, zh, ja, ko, id, es, fr, de, ru, pt, it, tr, pl, uk, ar, fa, hi, bn, ro
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
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --font-sans: 'Plus Jakarta Sans', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans Arabic', 'Noto Sans Devanagari', 'Noto Sans Bengali', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    .nav-link { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-secondary); text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.15s ease; cursor: pointer; background: none; border: none; padding: 0; outline: none; }
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
      max-width: 170px;
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
    .mobile-inline-stats { display: none; }

    /* ========================================================
       Mobile & Tablet Responsive Optimizations (PWA & Touch)
       ======================================================== */
    @media (max-width: 1024px) {
      .sticky-nav-inner { padding: 0.65rem 1rem; }
      .page-shell { padding: 1.25rem 1rem 3rem 1rem; gap: 1.25rem; }
      .hero-subtitle { font-size: clamp(1.4rem, 4vw, 2rem); }
      .item-title-col { max-width: 320px; }
      .modal-dialog { max-width: 90vw; max-height: 90vh; }
    }

    @media (max-width: 768px) {
      /* Mobile Nav */
      .sticky-nav-inner { flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem 0.75rem; }
      .nav-brand { font-size: 0.875rem; }
      .nav-links { display: none; }
      .nav-actions { width: 100%; display: flex; justify-content: space-between; gap: 0.35rem; }
      .nav-actions select.select-input { flex: 1.2; font-size: 0.75rem; padding: 0.4rem 0.45rem; max-width: none; }
      .nav-actions button.button { flex: 1; font-size: 0.75rem; padding: 0.4rem 0.45rem; }
      
      /* Mobile Hero */
      .hero-zone { padding: 0.5rem 0 0.75rem 0; }
      .hero-subtitle { font-size: 1.35rem; line-height: 1.25; margin-bottom: 0.4rem; }
      .hero-orient { font-size: 0.75rem; line-height: 1.45; }

      /* Mobile Switcher Tabs with touch momentum scrolling */
      .search-switcher-box { border-radius: var(--radius-sm); }
      .switcher-tabs {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .switcher-tabs::-webkit-scrollbar { display: none; }
      .switcher-tab { padding: 0.65rem 0.75rem; font-size: 0.75rem; min-height: 44px; display: inline-flex; align-items: center; }

      /* Mobile Search Command Row */
      .search-command-row { padding: 0.5rem 0.65rem; gap: 0.5rem; }
      .search-shortcut-tag { display: none; }
      .search-main-input { font-size: 16px; /* Prevents auto-zoom on iOS */ }
      .search-command-row button { min-height: 38px; padding: 0.4rem 0.75rem; }

      /* Feeds & Filter Toolbar */
      .frame-toolbar { padding: 0.5rem 0.75rem; gap: 0.5rem; }
      .controls-toolbar { flex-direction: column; align-items: flex-start; gap: 0.5rem; padding: 0.5rem 0.75rem; }
      .filter-controls-group { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; }
      .filter-controls-group select.select-input { flex: 1; font-size: 0.75rem; padding: 0.35rem; }
      .filter-checkbox-label { font-size: 0.6875rem; }
      #toolbar-click-tip { font-size: 0.625rem; }

      /* Mobile Card Layout for Results */
      .data-table thead { display: none; }
      .data-table, .data-table tbody { display: block; width: 100%; }
      .data-table tr.data-row {
        display: grid;
        grid-template-areas:
          "title star"
          "badges badges"
          "footer footer";
        grid-template-columns: 1fr auto;
        gap: 0.4rem;
        padding: 0.85rem 0.75rem;
        border-bottom: 1px solid var(--border-default);
        position: relative;
        background: var(--color-bg-surface);
        border-radius: var(--radius-xs);
        margin-bottom: 0.4rem;
      }
      .data-table tr.data-row:nth-child(even) { background: var(--color-bg-elevated); }
      
      .col-title { grid-area: title; max-width: 100% !important; padding: 0 !important; border: none !important; }
      .col-title .item-title-link {
        font-size: 0.875rem;
        font-weight: 600;
        white-space: normal !important;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.35;
      }
      .col-title .item-meta-row { display: none; }

      .col-star { grid-area: star; padding: 0 !important; border: none !important; display: flex; align-items: center; justify-content: flex-end; }
      .col-star .btn-bookmark { font-size: 1.25rem; min-width: 38px; min-height: 38px; display: flex; align-items: center; justify-content: center; }

      .col-cat { grid-area: badges; padding: 0 !important; border: none !important; display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; }
      .col-health { display: none !important; }
      .col-size { display: none !important; }
      .col-swarm { display: none !important; }
      .col-date { display: none !important; }

      /* Mobile custom footer row with size, swarm, date & Magnet button */
      .col-actions {
        grid-area: footer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 0.45rem !important;
        border-top: var(--border-subtle) !important;
        border-bottom: none !important;
        width: 100%;
      }
      .mobile-inline-stats {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
      }
      .col-actions .button { min-height: 36px; padding: 0.35rem 0.85rem; font-size: 0.75rem; }

      /* Modals on Mobile */
      .modal-dialog { width: 96vw; max-height: 94vh; border-radius: var(--radius-sm); }
      .modal-header { padding: 0.75rem 1rem; }
      .modal-body { padding: 0.85rem; gap: 1rem; }
      .modal-footer { padding: 0.75rem 1rem; flex-direction: column-reverse; gap: 0.5rem; }
      .modal-footer button { width: 100%; min-height: 42px; font-size: 0.8125rem; }
    }
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
        <button type="button" class="nav-link is-active" id="nav-link-search">Search</button>
        <button type="button" class="nav-link" id="nav-link-bookmarks">⭐ Bookmarks</button>
        <button type="button" class="nav-link" id="nav-link-aeropad" onclick="openAeropadModal()">📝 Aeropad</button>
        <button type="button" class="nav-link" id="nav-link-about" onclick="openAboutModal()">ℹ️ About</button>
      </div>

      <div class="nav-actions">
        <select id="select-global-lang" class="select-input" title="Language Selector">
          <option value="vi">🇻🇳 Tiếng Việt</option>
          <option value="en">🇺🇸 English</option>
          <option value="zh">🇨🇳 中文 (简体)</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="id">🇮🇩 Bahasa Indonesia</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="pt">🇧🇷 Português</option>
          <option value="it">🇮🇹 Italiano</option>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="pl">🇵🇱 Polski</option>
          <option value="uk">🇺🇦 Українська</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="fa">🇮🇷 فارسی</option>
          <option value="hi">🇮🇳 हिन्दी</option>
          <option value="bn">🇧🇩 বাংলা</option>
          <option value="ro">🇷🇴 Română</option>
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

    <!-- Footer / Other Products Section -->
    <footer class="app-footer" style="margin-top: 4rem; padding-top: 2.5rem; border-top: var(--border-default); background: var(--color-bg-subtle);">
      <div style="max-width: var(--max-width); margin: 0 auto; padding: 0 1.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
          
          <!-- Column 1: Ecosystem & Other Products -->
          <div class="footer-col">
            <div id="footer-eco-title" style="font-size: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-accent); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
              🚀 CÁC SẢN PHẨM KHÁC / ECOSYSTEM PRODUCTS
            </div>
            <div style="background: var(--color-bg-canvas); border: var(--border-subtle); border-radius: var(--radius-xs); padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-weight: 800; font-size: 0.9375rem; color: var(--color-text-primary); display: flex; align-items: center; gap: 0.4rem;">
                  📝 Aeropad
                  <span class="badge badge-accent" style="font-size: 0.65rem;">Companion</span>
                </span>
                <button type="button" class="button button--primary button--sm" onclick="openAeropadModal()" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">Mở Aeropad ↗</button>
              </div>
              <p id="footer-aeropad-desc" style="font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5; margin: 0;">
                Bảng ghi nhớ siêu dữ liệu và bóc tách liên kết Magnet hàng loạt không lưu vết (Zero-Log). Quản lý, lọc và xuất danh sách Magnet link cho qBittorrent, Aria2 ngay trên trình duyệt.
              </p>
            </div>
          </div>

          <!-- Column 2: Quick Links & Documentation -->
          <div class="footer-col">
            <div id="footer-res-title" style="font-size: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
              📚 TÀI LIỆU &amp; TÀI NGUYÊN (RESOURCES)
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8125rem;">
              <li><a href="#" onclick="openAboutModal(); return false;" style="color: var(--color-text-secondary); text-decoration: none;">ℹ️ Giới thiệu CherryTor &amp; Aeropad (About)</a></li>
              <li><a href="https://github.com/oaichu/CherryTor/blob/main/README.md" target="_blank" style="color: var(--color-text-secondary); text-decoration: none;">📖 Hướng dẫn sử dụng &amp; API Docs (GitHub)</a></li>
              <li><a href="https://github.com/oaichu/CherryTor" target="_blank" style="color: var(--color-text-secondary); text-decoration: none;">⭐ Mã nguồn mở GitHub Repository</a></li>
              <li><a href="#invariants" style="color: var(--color-text-secondary); text-decoration: none;">🛡️ 10 Quy tắc bảo mật Invariants</a></li>
            </ul>
          </div>

          <!-- Column 3: Live Endpoints & Status -->
          <div class="footer-col">
            <div id="footer-edge-title" style="font-size: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
              ⚡ TRẠM MÁY CHỦ (EDGE DEPLOYMENTS)
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8125rem; font-family: var(--font-mono);">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--color-text-muted);">Custom Domain:</span>
                <a href="https://cherrytor.io.vn" target="_blank" style="color: var(--color-cyan-400);">cherrytor.io.vn</a>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--color-text-muted);">Edge Mirror:</span>
                <a href="https://tor.oaichuhust.workers.dev" target="_blank" style="color: var(--color-text-accent);">tor.oaichuhust.workers.dev</a>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--color-text-muted);">Status:</span>
                <span style="color: var(--color-green-400); font-weight: 700;">● Live 100% (Edge 15ms)</span>
              </div>
            </div>
          </div>

        </div>

        <div style="border-top: var(--border-subtle); padding: 1.25rem 0 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.75rem; color: var(--color-text-muted);">
          <div>
            &copy; 2026 <strong>CherryTor</strong> &bull; Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" style="color: var(--color-text-secondary);">MIT License</a>.
          </div>
          <div style="display: flex; gap: 1rem;">
            <span>Zero Tracking</span> &bull; <span>Zero Logs</span> &bull; <span>No Arbitrary Proxy</span>
          </div>
        </div>
      </div>
    </footer>

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
        },
        es: {
          nav_search: 'Buscar',
          nav_bookmarks: '⭐ Guardados',
          nav_invariants: 'Seguridad',
          btn_theme_dark: 'Tema: Oscuro',
          btn_theme_light: 'Tema: Claro',
          btn_settings: '⚙ Ajustes',
          hero_sub_pre: 'Hay muchos buscadores de torrents,',
          hero_sub_post: 'pero este es ',
          hero_orient: 'Agregador de metadatos minimalista y seguro. Cero proxy arbitrario, registros ascendentes tipados y clasificación multiseñal.',
          tab_all: 'Todas las Categorías',
          tab_movies: '🎬 Películas y Series',
          tab_anime: '🌸 Anime y Drama',
          tab_software: '💻 Software y SO',
          tab_games: '🎮 Videojuegos',
          tab_books: '📚 Libros y Textos',
          tab_music: '🎵 Música Lossless',
          tab_bookmarks: '⭐ Guardados',
          search_placeholder: "Buscar metadatos (ej: 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Buscar',
          focus_tag: '[/] enfocar',
          caption_title: 'FUENTE DE METADATOS VERIFICADA',
          active_providers_suffix: 'Activos',
          label_sort_by: 'Ordenar por:',
          sort_seeders: 'Semillas ↓ (Mayor)',
          sort_size_desc: 'Tamaño ↓ (Mayor)',
          sort_size_asc: 'Tamaño ↑ (Menor)',
          sort_date_desc: 'Fecha ↓ (Más reciente)',
          sort_title_asc: 'Título (A → Z)',
          label_hide_dead: 'Ocultar torrents muertos (0 Semillas)',
          toolbar_tip: '💡 Haz clic en una fila para ver metadatos y trackers',
          th_title: 'Título / Lanzamiento',
          th_category: 'Categoría',
          th_size: 'Tamaño',
          th_swarm: 'Semillas / Pares',
          th_health: 'Estado',
          th_date: 'Fecha',
          th_action: 'Acción',
          state_ready: 'LISTO PARA CONSULTAR FUENTES',
          state_ready_desc: 'Escribe un término arriba para buscar metadatos seguros.',
          state_searching: 'BUSCANDO EN FUENTES VERIFICADAS...',
          state_searching_desc: 'Consultando proveedores en paralelo...',
          state_empty: 'NO SE ENCONTRARON METADATOS',
          state_empty_desc: 'Intenta cambiar los términos o activar más proveedores.',
          state_bookmarks_empty: 'NO HAY TORRENTS GUARDADOS',
          state_bookmarks_empty_desc: 'Haz clic en ⭐ para guardar torrents sin conexión.',
          toast_copied: '✓ ¡Enlace Magnet copiado!',
          toast_copied_hash: '✓ ¡InfoHash copiado!',
          toast_bookmarked: '⭐ ¡Guardado en favoritos!',
          toast_unbookmarked: '✓ Eliminado de guardados.',
          toast_cached: '✓ ¡Caché limpiada con éxito!',
          toast_reset: '✓ ¡Ajustes restablecidos!',
          toast_at_least_one: '¡Al menos un proveedor debe estar activo!',
          modal_title: '⚙ AJUSTES Y REGISTRO DE PROVEEDORES',
          modal_inspector_title: '🔍 INSPECTOR DE METADATOS TORRENT',
          sec_lang: '🌐 Idioma de Visualización',
          sec_lang_desc: 'Selecciona el idioma de la interfaz',
          sec_asian_movies: '🌸 Películas Asiáticas y Anime',
          sec_global_movies: '🎬 Películas y Series Globales',
          sec_software: '💻 Software y Sistemas Operativos',
          sec_games: '🎮 Juegos de PC y Repacks',
          sec_books: '📚 Libros y Documentos',
          sec_music: '🎵 Música y Audio Hi-Res',
          sec_density: '🎨 Densidad de la Tabla',
          density_label: 'Espaciado de filas',
          density_compact: 'Compacto',
          density_comfortable: 'Cómodo',
          sec_safe_mode: '🛡️ Modo Seguro y Filtro NSFW',
          safe_mode_label: 'Activar Modo Seguro (Ocultar contenido para adultos)',
          sec_torznab: '🔌 Indexador Privado (Torznab / Jackett)',
          torznab_desc: 'Conecta tu servidor Jackett/Prowlarr para trackers privados',
          sec_privacy: '🛡️ Privacidad y Caché Local',
          privacy_desc: 'Cero cookies de rastreo y cero proxies no autorizados.',
          btn_purge_cache: 'Limpiar Caché e Historial',
          btn_export_bm: 'Exportar Guardados (JSON)',
          btn_import_bm: 'Importar Guardados (JSON)',
          btn_reset: 'Restablecer Ajustes',
          btn_done: 'Listo',
          btn_open_client: 'Abrir en Cliente Torrent'
        },
        fr: {
          nav_search: 'Recherche',
          nav_bookmarks: '⭐ Favoris',
          nav_invariants: 'Sécurité',
          btn_theme_dark: 'Thème: Sombre',
          btn_theme_light: 'Thème: Clair',
          btn_settings: '⚙ Paramètres',
          hero_sub_pre: 'Il existe de nombreux moteurs de recherche torrent,',
          hero_sub_post: 'mais celui-ci est ',
          hero_orient: 'Agrégateur de métadonnées minimaliste et sécurisé. Zéro proxy arbitraire, flux vérifiés stricts et classement multi-signaux.',
          tab_all: 'Toutes Catégories',
          tab_movies: '🎬 Films & Séries',
          tab_anime: '🌸 Anime & Drama',
          tab_software: '💻 Logiciels & OS',
          tab_games: '🎮 Jeux Vidéo',
          tab_books: '📚 Livres & Ebooks',
          tab_music: '🎵 Musique Lossless',
          tab_bookmarks: '⭐ Favoris',
          search_placeholder: "Rechercher des métadonnées (ex: 'avatar', 'ubuntu', 'elden ring')...",
          search_btn: 'Rechercher',
          focus_tag: '[/] focus',
          caption_title: 'FLUX DE MÉTADONNÉES VÉRIFIÉ',
          active_providers_suffix: 'Actifs',
          label_sort_by: 'Trier par:',
          sort_seeders: 'Seeders ↓ (Plus élevé)',
          sort_size_desc: 'Taille ↓ (Plus grande)',
          sort_size_asc: 'Taille ↑ (Plus petite)',
          sort_date_desc: 'Date ↓ (Plus récent)',
          sort_title_asc: 'Titre (A → Z)',
          label_hide_dead: 'Masquer torrents morts (0 Seeder)',
          toolbar_tip: '💡 Cliquez sur une ligne pour inspecter les métadonnées',
          th_title: 'Titre / Version',
          th_category: 'Catégorie',
          th_size: 'Taille',
          th_swarm: 'Seeders / Leechers',
          th_health: 'État',
          th_date: 'Date',
          th_action: 'Action',
          state_ready: 'PRÊT À RECHERCHER SUR LE SWARM',
          state_ready_desc: 'Tapez un mot-clé ci-dessus pour agréger les métadonnées.',
          state_searching: 'RECHERCHE EN COURS...',
          state_searching_desc: 'Requêtes parallèles sur les fournisseurs agréés...',
          state_empty: 'AUCUN RÉSULTAT',
          state_empty_desc: 'Modifiez votre recherche ou activez plus de sources.',
          state_bookmarks_empty: 'AUCUN FAVORI ENREGISTRÉ',
          state_bookmarks_empty_desc: 'Cliquez sur ⭐ pour sauvegarder un torrent hors ligne.',
          toast_copied: '✓ Lien Magnet copié !',
          toast_copied_hash: '✓ InfoHash copié !',
          toast_bookmarked: '⭐ Ajouté aux favoris !',
          toast_unbookmarked: '✓ Retiré des favoris.',
          toast_cached: '✓ Cache vidé avec succès !',
          toast_reset: '✓ Paramètres réinitialisés !',
          toast_at_least_one: 'Au moins 1 fournisseur doit être activé !',
          modal_title: '⚙ PARAMÈTRES & FOURNISSEURS',
          modal_inspector_title: '🔍 INSPECTEUR DE MÉTADONNÉES',
          sec_lang: "🌐 Langue d'affichage",
          sec_lang_desc: "Choisir la langue de l'interface",
          sec_asian_movies: '🌸 Films Asiatiques & Anime',
          sec_global_movies: '🎬 Films & Séries Mondiales',
          sec_software: '💻 Logiciels & Systèmes',
          sec_games: '🎮 Jeux PC & Repacks',
          sec_books: '📚 Livres & Documents',
          sec_music: '🎵 Musique Hi-Res / FLAC',
          sec_density: "🎨 Densité de l'affichage",
          density_label: 'Espacement du tableau',
          density_compact: 'Compact',
          density_comfortable: 'Confortable',
          sec_safe_mode: '🛡️ Mode Sécurisé & Filtre NSFW',
          safe_mode_label: 'Activer le mode sécurisé (masquer contenu adulte)',
          sec_torznab: '🔌 Serveur Privé (Torznab / Jackett)',
          torznab_desc: 'Connectez votre serveur Jackett/Prowlarr personnel',
          sec_privacy: '🛡️ Confidentialité & Cache',
          privacy_desc: 'Zéro cookie de traçage, zéro proxy non autorisé.',
          btn_purge_cache: 'Vider le cache',
          btn_export_bm: 'Exporter Favoris (JSON)',
          btn_import_bm: 'Importer Favoris (JSON)',
          btn_reset: 'Réinitialiser',
          btn_done: 'Terminer',
          btn_open_client: 'Ouvrir dans le Client Torrent'
        },
        de: {
          nav_search: 'Suche',
          nav_bookmarks: '⭐ Gespeichert',
          nav_invariants: 'Sicherheit',
          btn_theme_dark: 'Design: Dunkel',
          btn_theme_light: 'Design: Hell',
          btn_settings: '⚙ Einstellungen',
          hero_sub_pre: 'Es gibt viele Torrent-Suchmaschinen,',
          hero_sub_post: 'aber diese ist ',
          hero_orient: 'Minimalistischer, sicherheitsorientierter Metadaten-Aggregator. Keine willkürlichen Proxys, verifizierte Upstream-Quellen und Ranking.',
          tab_all: 'Alle Kategorien',
          tab_movies: '🎬 Filme & Serien',
          tab_anime: '🌸 Anime & Drama',
          tab_software: '💻 Software & OS',
          tab_games: '🎮 PC-Spiele',
          tab_books: '📚 Bücher & Texte',
          tab_music: '🎵 Musik & FLAC',
          tab_bookmarks: '⭐ Gespeichert',
          search_placeholder: "Suchbegriff eingeben (z.B. 'avatar', 'ubuntu', 'elden ring')...",
          search_btn: 'Suchen',
          focus_tag: '[/] Fokus',
          caption_title: 'VERIFIZIERTER METADATEN-FEED',
          active_providers_suffix: 'Aktiv',
          label_sort_by: 'Sortieren nach:',
          sort_seeders: 'Seeders ↓ (Höchste)',
          sort_size_desc: 'Größe ↓ (Größte)',
          sort_size_asc: 'Größe ↑ (Kleinste)',
          sort_date_desc: 'Datum ↓ (Neueste)',
          sort_title_asc: 'Titel (A → Z)',
          label_hide_dead: 'Tote Torrents ausblenden (0 Seeder)',
          toolbar_tip: '💡 Zeile anklicken für Details und Tracker-Liste',
          th_title: 'Titel / Release',
          th_category: 'Kategorie',
          th_size: 'Größe',
          th_swarm: 'Seed / Peer',
          th_health: 'Status',
          th_date: 'Datum',
          th_action: 'Aktion',
          state_ready: 'BEREIT FÜR ECHTZEIT-SUCHE',
          state_ready_desc: 'Suchbegriff oben eingeben, um Metadaten zu aggregieren.',
          state_searching: 'SUCHE QUELLE PARALLEL...',
          state_searching_desc: 'Abfrage autorisierter Upstream-Server...',
          state_empty: 'KEINE METADATEN GEFUNDEN',
          state_empty_desc: 'Suchbegriff ändern oder weitere Quellen aktivieren.',
          state_bookmarks_empty: 'KEINE GESPEICHERTEN TORRENTS',
          state_bookmarks_empty_desc: 'Klicken Sie auf ⭐, um Einträge offline zu speichern.',
          toast_copied: '✓ Magnet-Link kopiert!',
          toast_copied_hash: '✓ InfoHash kopiert!',
          toast_bookmarked: '⭐ Zu Favoriten hinzugefügt!',
          toast_unbookmarked: '✓ Aus Favoriten entfernt.',
          toast_cached: '✓ Cache erfolgreich gelöscht!',
          toast_reset: '✓ Standardeinstellungen wiederhergestellt!',
          toast_at_least_one: 'Mindestens eine Quelle muss aktiv sein!',
          modal_title: '⚙ EINSTELLUNGEN & QUELLENVERWALTUNG',
          modal_inspector_title: '🔍 METADATEN-INSPEKTOR',
          sec_lang: '🌐 Anzeigesprache',
          sec_lang_desc: 'Wählen Sie die Sprache der Benutzeroberfläche',
          sec_asian_movies: '🌸 Asiatische Filme & Anime',
          sec_global_movies: '🎬 Filme & Serien (Global)',
          sec_software: '💻 Software & Betriebssysteme',
          sec_games: '🎮 PC-Spiele & Repacks',
          sec_books: '📚 Bücher & Dokumente',
          sec_music: '🎵 Musik & Hi-Res Audio',
          sec_density: '🎨 Tabellendichte',
          density_label: 'Zeilenabstand',
          density_compact: 'Kompakt',
          density_comfortable: 'Komfortabel',
          sec_safe_mode: '🛡️ Sicherheitsmodus & NSFW-Filter',
          safe_mode_label: 'Sicherheitsmodus aktivieren (Erwachseneninhalte filtern)',
          sec_torznab: '🔌 Privater Indexer (Torznab / Jackett)',
          torznab_desc: 'Eigenen Jackett/Prowlarr Server verbinden',
          sec_privacy: '🛡️ Datenschutz & Lokaler Cache',
          privacy_desc: 'Keine Tracking-Cookies, keine unerlaubten Proxys.',
          btn_purge_cache: 'Cache & Verlauf leeren',
          btn_export_bm: 'Favoriten exportieren (JSON)',
          btn_import_bm: 'Favoriten importieren (JSON)',
          btn_reset: 'Zurücksetzen',
          btn_done: 'Fertig',
          btn_open_client: 'In Torrent-Client öffnen'
        },
        ru: {
          nav_search: 'Поиск',
          nav_bookmarks: '⭐ Закладки',
          nav_invariants: 'Безопасность',
          btn_theme_dark: 'Тема: Тёмная',
          btn_theme_light: 'Тема: Светлая',
          btn_settings: '⚙ Настройки',
          hero_sub_pre: 'Существует много поисковиков торрентов,',
          hero_sub_post: 'но лучший из них — ',
          hero_orient: 'Минималистичный агрегатор метаданных без прокси-серверов, с проверенными источниками и строгой безопасностью.',
          tab_all: 'Все категории',
          tab_movies: '🎬 Фильмы и Сериалы',
          tab_anime: '🌸 Аниме и Дорамы',
          tab_software: '💻 Софт и ОС',
          tab_games: '🎮 Игры для ПК',
          tab_books: '📚 Книги и Тексты',
          tab_music: '🎵 Музыка Lossless',
          tab_bookmarks: '⭐ Закладки',
          search_placeholder: "Поиск метаданных (напр. 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Искать',
          focus_tag: '[/] фокус',
          caption_title: 'ПРОВЕРЕННЫЙ ПОТОК МЕТАДАННЫХ',
          active_providers_suffix: 'Активно',
          label_sort_by: 'Сортировка:',
          sort_seeders: 'Сиды ↓ (По убыванию)',
          sort_size_desc: 'Размер ↓ (Большие)',
          sort_size_asc: 'Размер ↑ (Маленькие)',
          sort_date_desc: 'Дата ↓ (Новые)',
          sort_title_asc: 'Название (А → Я)',
          label_hide_dead: 'Скрыть неактивные (0 Сидов)',
          toolbar_tip: '💡 Нажмите на строку для просмотра метаданных и трекеров',
          th_title: 'Название / Релиз',
          th_category: 'Категория',
          th_size: 'Размер',
          th_swarm: 'Сиды / Личи',
          th_health: 'Статус',
          th_date: 'Дата',
          th_action: 'Действие',
          state_ready: 'ГОТОВ К ПОИСКУ В РЕАЛЬНОМ ВРЕМЕНИ',
          state_ready_desc: 'Введите поисковый запрос выше для сбора метаданных.',
          state_searching: 'ПОИСК ПО ИСТОЧНИКАМ...',
          state_searching_desc: 'Параллельный опрос официальных реестров...',
          state_empty: 'НИЧЕГО НЕ НАЙДЕНО',
          state_empty_desc: 'Попробуйте изменить запрос или включить больше источников.',
          state_bookmarks_empty: 'НЕТ СОХРАНЁННЫХ ТОРРЕНТОВ',
          state_bookmarks_empty_desc: 'Нажмите ⭐ в строке для сохранения оффлайн.',
          toast_copied: '✓ Magnet-ссылка скопирована!',
          toast_copied_hash: '✓ InfoHash скопирован!',
          toast_bookmarked: '⭐ Добавлено в закладки!',
          toast_unbookmarked: '✓ Удалено из закладок.',
          toast_cached: '✓ Кэш успешно очищен!',
          toast_reset: '✓ Настройки сброшены!',
          toast_at_least_one: 'Минимум 1 источник должен быть включён!',
          modal_title: '⚙ НАСТРОЙКИ И ИСТОЧНИКИ ДАННЫХ',
          modal_inspector_title: '🔍 ИНСПЕКТОР МЕТАДАННЫХ ТОРРЕНТА',
          sec_lang: '🌐 Язык интерфейса',
          sec_lang_desc: 'Выберите предпочитаемый язык',
          sec_asian_movies: '🌸 Азиатское кино и Аниме',
          sec_global_movies: '🎬 Мировое кино и Сериалы',
          sec_software: '💻 Программы и ОС',
          sec_games: '🎮 Игры для ПК и Репаки',
          sec_books: '📚 Книги и Документы',
          sec_music: '🎵 Музыка и Hi-Res Audio',
          sec_density: '🎨 Плотность таблицы',
          density_label: 'Интервал строк таблицы',
          density_compact: 'Компактный',
          density_comfortable: 'Обычный',
          sec_safe_mode: '🛡️ Безопасный режим и NSFW',
          safe_mode_label: 'Включить безопасный режим (скрывать контент 18+)',
          sec_torznab: '🔌 Свой сервер Torznab (Jackett / Prowlarr)',
          torznab_desc: 'Подключите личный сервер для закрытых трекеров',
          sec_privacy: '🛡️ Конфиденциальность и Кэш',
          privacy_desc: 'Никаких трекинг-cookie, никаких сторонних прокси.',
          btn_purge_cache: 'Очистить кэш и историю',
          btn_export_bm: 'Экспорт закладок (JSON)',
          btn_import_bm: 'Импорт закладок (JSON)',
          btn_reset: 'Сброс по умолчанию',
          btn_done: 'Готово',
          btn_open_client: 'Открыть в Торрент-клиенте'
        },
        pt: {
          nav_search: 'Pesquisar',
          nav_bookmarks: '⭐ Salvos',
          nav_invariants: 'Segurança',
          btn_theme_dark: 'Tema: Escuro',
          btn_theme_light: 'Tema: Claro',
          btn_settings: '⚙ Configurações',
          hero_sub_pre: 'Existem muitos buscadores de torrents,',
          hero_sub_post: 'mas este é o ',
          hero_orient: 'Agregador de metadados minimalista e focado em segurança. Zero proxies arbitrários, registros estritos e classificação multissinal.',
          tab_all: 'Todas as Categorias',
          tab_movies: '🎬 Filmes e Séries',
          tab_anime: '🌸 Animes e Dramas',
          tab_software: '💻 Softwares e SO',
          tab_games: '🎮 Jogos de PC',
          tab_books: '📚 Livros e Textos',
          tab_music: '🎵 Músicas e FLAC',
          tab_bookmarks: '⭐ Salvos',
          search_placeholder: "Buscar metadados (ex: 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Buscar',
          focus_tag: '[/] focar',
          caption_title: 'METADADOS DE SWARM VERIFICADOS',
          active_providers_suffix: 'Ativos',
          label_sort_by: 'Ordenar por:',
          sort_seeders: 'Seeds ↓ (Maior)',
          sort_size_desc: 'Tamanho ↓ (Maior)',
          sort_size_asc: 'Tamanho ↑ (Menor)',
          sort_date_desc: 'Data ↓ (Mais recente)',
          sort_title_asc: 'Título (A → Z)',
          label_hide_dead: 'Ocultar torrents mortos (0 Seeds)',
          toolbar_tip: '💡 Clique em uma linha para ver metadados e trackers',
          th_title: 'Título / Lançamento',
          th_category: 'Categoria',
          th_size: 'Tamanho',
          th_swarm: 'Seeds / Peers',
          th_health: 'Status',
          th_date: 'Data',
          th_action: 'Ação',
          state_ready: 'PRONTO PARA CONSULTAR SWARMS',
          state_ready_desc: 'Digite um termo acima para buscar metadados seguros.',
          state_searching: 'BUSCANDO EM FONTES OFICIAIS...',
          state_searching_desc: 'Consultando provedores em paralelo...',
          state_empty: 'NENHUM RESULTADO ENCONTRADO',
          state_empty_desc: 'Tente alterar os termos ou ativar mais provedores.',
          state_bookmarks_empty: 'NENHUM TORRENT SALVO',
          state_bookmarks_empty_desc: 'Clique em ⭐ para salvar torrents offline.',
          toast_copied: '✓ Link Magnet copiado!',
          toast_copied_hash: '✓ InfoHash copiado!',
          toast_bookmarked: '⭐ Adicionado aos salvos!',
          toast_unbookmarked: '✓ Removido dos salvos.',
          toast_cached: '✓ Cache limpo com sucesso!',
          toast_reset: '✓ Configurações padrão restauradas!',
          toast_at_least_one: 'Ao menos 1 provedor deve estar ativo!',
          modal_title: '⚙ CONFIGURAÇÕES & PROVEDORES',
          modal_inspector_title: '🔍 INSPETOR DE METADADOS',
          sec_lang: '🌐 Idioma da Interface',
          sec_lang_desc: 'Selecione o idioma de exibição',
          sec_asian_movies: '🌸 Filmes Asiáticos & Animes',
          sec_global_movies: '🎬 Filmes & Séries Globais',
          sec_software: '💻 Softwares & Sistemas Operacionais',
          sec_games: '🎮 Jogos de PC & Repacks',
          sec_books: '📚 Livros & Ebooks',
          sec_music: '🎵 Músicas & Áudio Hi-Res',
          sec_density: '🎨 Densidade da Tabela',
          density_label: 'Espaçamento das linhas',
          density_compact: 'Compacto',
          density_comfortable: 'Confortável',
          sec_safe_mode: '🛡️ Modo Seguro & Filtro NSFW',
          safe_mode_label: 'Ativar Modo Seguro (ocultar conteúdo adulto)',
          sec_torznab: '🔌 Indexador Privado (Torznab / Jackett)',
          torznab_desc: 'Conecte seu servidor Jackett/Prowlarr pessoal',
          sec_privacy: '🛡️ Privacidade & Cache Local',
          privacy_desc: 'Zero cookies de rastreamento, zero proxies arbitrários.',
          btn_purge_cache: 'Limpar Cache e Histórico',
          btn_export_bm: 'Exportar Salvos (JSON)',
          btn_import_bm: 'Importar Salvos (JSON)',
          btn_reset: 'Restaurar Padrões',
          btn_done: 'Concluído',
          btn_open_client: 'Abrir no Cliente Torrent'
        },
        it: {
          nav_search: 'Cerca',
          nav_bookmarks: '⭐ Preferiti',
          nav_invariants: 'Sicurezza',
          btn_theme_dark: 'Tema: Scuro',
          btn_theme_light: 'Tema: Chiaro',
          btn_settings: '⚙ Impostazioni',
          hero_sub_pre: 'Esistono molti motori di ricerca torrent,',
          hero_sub_post: 'ma questo è ',
          hero_orient: 'Aggregatore di metadati minimalista e sicuro. Zero proxy non autorizzati, fonti verificate e ordinamento multi-segnale.',
          tab_all: 'Tutte le Categorie',
          tab_movies: '🎬 Film & Serie TV',
          tab_anime: '🌸 Anime & Drama',
          tab_software: '💻 Software & OS',
          tab_games: '🎮 Videogiochi PC',
          tab_books: '📚 Libri & Testi',
          tab_music: '🎵 Musica Lossless',
          tab_bookmarks: '⭐ Preferiti',
          search_placeholder: "Cerca metadati (es. 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Cerca',
          focus_tag: '[/] focus',
          caption_title: 'METADATI SWARM VERIFICATI',
          active_providers_suffix: 'Attivi',
          label_sort_by: 'Ordina per:',
          sort_seeders: 'Seeders ↓ (Maggiori)',
          sort_size_desc: 'Dimensione ↓ (Grandi)',
          sort_size_asc: 'Dimensione ↑ (Piccoli)',
          sort_date_desc: 'Data ↓ (Recenti)',
          sort_title_asc: 'Titolo (A → Z)',
          label_hide_dead: 'Nascondi torrent inattivi (0 Seeders)',
          toolbar_tip: '💡 Clicca su una riga per ispezionare metadati e tracker',
          th_title: 'Titolo / Release',
          th_category: 'Categoria',
          th_size: 'Dimensione',
          th_swarm: 'Seeders / Leechers',
          th_health: 'Stato',
          th_date: 'Data',
          th_action: 'Azione',
          state_ready: 'PRONTO PER LA RICERCA SWARM',
          state_ready_desc: 'Inserisci un termine sopra per raccogliere metadati sicuri.',
          state_searching: 'RICERCA SULLE FONTI IN CORSO...',
          state_searching_desc: 'Interrogazione parallela dei provider approvati...',
          state_empty: 'NESSUN METADATO TROVATO',
          state_empty_desc: 'Prova a modificare la ricerca o attiva più provider.',
          state_bookmarks_empty: 'NESSUN PREFERITO SALVATO',
          state_bookmarks_empty_desc: 'Clicca su ⭐ per salvare i torrent offline.',
          toast_copied: '✓ Link Magnet copiato!',
          toast_copied_hash: '✓ InfoHash copiato!',
          toast_bookmarked: '⭐ Aggiunto ai preferiti!',
          toast_unbookmarked: '✓ Rimosso dai preferiti.',
          toast_cached: '✓ Cache svuotata con successo!',
          toast_reset: '✓ Impostazioni predefinite ripristinate!',
          toast_at_least_one: 'Almeno 1 provider deve essere attivo!',
          modal_title: '⚙ IMPOSTAZIONI & REGISTRO PROVIDER',
          modal_inspector_title: '🔍 ISPETTORE METADATI TORRENT',
          sec_lang: '🌐 Lingua di visualizzazione',
          sec_lang_desc: "Seleziona la lingua dell'interfaccia",
          sec_asian_movies: '🌸 Film Asiatici & Anime',
          sec_global_movies: '🎬 Film & Serie Mondiali',
          sec_software: '💻 Software & Sistemi Operativi',
          sec_games: '🎮 Giochi PC & Repack',
          sec_books: '📚 Libri & Documenti',
          sec_music: '🎵 Musica & Audio Hi-Res',
          sec_density: '🎨 Densità Tabella',
          density_label: 'Spaziatura delle righe',
          density_compact: 'Compatto',
          density_comfortable: 'Comodo',
          sec_safe_mode: '🛡️ Modalità Sicura & Filtro NSFW',
          safe_mode_label: 'Attiva Modalità Sicura (nascondi contenuti per adulti)',
          sec_torznab: '🔌 Server Privato (Torznab / Jackett)',
          torznab_desc: 'Collega il tuo server Jackett/Prowlarr personale',
          sec_privacy: '🛡️ Privacy & Cache Locale',
          privacy_desc: 'Zero cookie di tracciamento, zero proxy non autorizzati.',
          btn_purge_cache: 'Svuota Cache & Cronologia',
          btn_export_bm: 'Esporta Preferiti (JSON)',
          btn_import_bm: 'Importa Preferiti (JSON)',
          btn_reset: 'Ripristina Predefiniti',
          btn_done: 'Fatto',
          btn_open_client: 'Apri nel Client Torrent'
        },
        tr: {
          nav_search: 'Arama',
          nav_bookmarks: '⭐ Kaydedilenler',
          nav_invariants: 'Güvenlik',
          btn_theme_dark: 'Tema: Koyu',
          btn_theme_light: 'Tema: Açık',
          btn_settings: '⚙ Ayarlar',
          hero_sub_pre: 'Pek çok torrent arama motoru var,',
          hero_sub_post: 'ancak en iyisi ',
          hero_orient: 'Minimalist ve güvenlik odaklı torrent meta veri toplayıcısı. Sıfır rastgele proxy, doğrulanmış kaynaklar ve çoklu sinyal sıralaması.',
          tab_all: 'Tüm Kategoriler',
          tab_movies: '🎬 Filmler & Diziler',
          tab_anime: '🌸 Anime & Asya Dizileri',
          tab_software: '💻 Yazılım & İşletim Sistemi',
          tab_games: '🎮 PC Oyunları',
          tab_books: '📚 Kitaplar & Metinler',
          tab_music: '🎵 Müzik & FLAC',
          tab_bookmarks: '⭐ Kaydedilenler',
          search_placeholder: "Meta veri ara (örn: 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Ara',
          focus_tag: '[/] odaklan',
          caption_title: 'DOĞRULANMIŞ SWARM METAVERİ AKIŞI',
          active_providers_suffix: 'Aktif',
          label_sort_by: 'Sırala:',
          sort_seeders: 'Seeders ↓ (En Çok)',
          sort_size_desc: 'Boyut ↓ (En Büyük)',
          sort_size_asc: 'Boyut ↑ (En Küçük)',
          sort_date_desc: 'Tarih ↓ (En Yeni)',
          sort_title_asc: 'Başlık (A → Z)',
          label_hide_dead: 'Ölü torrentleri gizle (0 Seeder)',
          toolbar_tip: '💡 Meta verileri ve tracker listesini görmek için satıra tıklayın',
          th_title: 'Başlık / Sürüm',
          th_category: 'Kategori',
          th_size: 'Boyut',
          th_swarm: 'Seed / Peer',
          th_health: 'Durum',
          th_date: 'Tarih',
          th_action: 'İşlem',
          state_ready: 'CANLI SORGULAMAYA HAZIR',
          state_ready_desc: 'Güvenli torrent meta verilerini toplamak için yukarıya bir arama terimi yazın.',
          state_searching: 'KAYNAKLARDA ARANIYOR...',
          state_searching_desc: 'Onaylı kaynaklar paralel olarak taranıyor...',
          state_empty: 'SONUÇ BULUNAMADI',
          state_empty_desc: 'Farklı bir arama deneyin veya ayarlardan daha fazla kaynak açın.',
          state_bookmarks_empty: 'HENÜZ KAYDEDİLEN TORRENT YOK',
          state_bookmarks_empty_desc: 'Çevrimdışı kaydetmek için satırdaki ⭐ simgesine tıklayın.',
          toast_copied: '✓ Magnet bağlantısı kopyalandı!',
          toast_copied_hash: '✓ InfoHash kopyalandı!',
          toast_bookmarked: '⭐ Kaydedilenlere eklendi!',
          toast_unbookmarked: '✓ Kaydedilenlerden çıkarıldı.',
          toast_cached: '✓ Önbellek temizlendi!',
          toast_reset: '✓ Varsayılan ayarlara dönüldü!',
          toast_at_least_one: 'En az 1 kaynak aktif olmalıdır!',
          modal_title: '⚙ AYARLAR VE KAYNAK YÖNETİMİ',
          modal_inspector_title: '🔍 TORRENT META VERİ İNCELEYİCİSİ',
          sec_lang: '🌐 Görüntüleme Dili',
          sec_lang_desc: 'Kullanıcı arayüzü dilini seçin',
          sec_asian_movies: '🌸 Asya Filmleri & Anime',
          sec_global_movies: '🎬 Küresel Filmler & Diziler',
          sec_software: '💻 Yazılım & İşletim Sistemleri',
          sec_games: '🎮 PC Oyunları & Repackler',
          sec_books: '📚 Kitaplar & Dokümanlar',
          sec_music: '🎵 Müzik & Hi-Res Ses',
          sec_density: '🎨 Tablo Satır Aralığı',
          density_label: 'Görünüm Yoğunluğu',
          density_compact: 'Kompakt (Sıkışık)',
          density_comfortable: 'Rahat (Geniş)',
          sec_safe_mode: '🛡️ Güvenli Mod & NSFW Filtresi',
          safe_mode_label: 'Güvenli Modu Aç (+18 yetişkin içerikleri filtrele)',
          sec_torznab: '🔌 Özel Torznab Sunucusu (Jackett)',
          torznab_desc: 'Özel trackerlar için kişisel Jackett/Prowlarr bağlayın',
          sec_privacy: '🛡️ Gizlilik ve Yerel Önbellek',
          privacy_desc: 'Takip çerezi yok, yetkisiz açık proxy yok.',
          btn_purge_cache: 'Önbellek & Geçmişi Temizle',
          btn_export_bm: 'Kaydedilenleri Dışa Aktar (JSON)',
          btn_import_bm: 'Kaydedilenleri İçe Aktar (JSON)',
          btn_reset: 'Varsayılana Sıfırla',
          btn_done: 'Tamam',
          btn_open_client: 'Torrent İstemcisinde Aç'
        },
        pl: {
          nav_search: 'Szukaj',
          nav_bookmarks: '⭐ Zapisane',
          nav_invariants: 'Bezpieczeństwo',
          btn_theme_dark: 'Motyw: Ciemny',
          btn_theme_light: 'Motyw: Jasny',
          btn_settings: '⚙ Ustawienia',
          hero_sub_pre: 'Istnieje wiele wyszukiwarek torrentów,',
          hero_sub_post: 'ale ta jest ',
          hero_orient: 'Minimalistyczny, bezpieczny agregator metadanych. Zero dowolnych proxy, zweryfikowane źródła upstream.',
          tab_all: 'Wszystkie Kategorie',
          tab_movies: '🎬 Filmy i Seriale',
          tab_anime: '🌸 Anime i Dramy',
          tab_software: '💻 Oprogramowanie i OS',
          tab_games: '🎮 Gry PC',
          tab_books: '📚 Książki i Ebooki',
          tab_music: '🎵 Muzyka Lossless',
          tab_bookmarks: '⭐ Zapisane',
          search_placeholder: "Wyszukaj metadane (np. 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Szukaj',
          focus_tag: '[/] fokus',
          caption_title: 'ZWERYFIKOWANY STRUMIEŃ METADANYCH',
          active_providers_suffix: 'Aktywne',
          label_sort_by: 'Sortuj według:',
          sort_seeders: 'Seeders ↓ (Najwięcej)',
          sort_size_desc: 'Rozmiar ↓ (Największe)',
          sort_size_asc: 'Rozmiar ↑ (Najmniejsze)',
          sort_date_desc: 'Data ↓ (Najnowsze)',
          sort_title_asc: 'Tytuł (A → Z)',
          label_hide_dead: 'Ukryj martwe torrenty (0 Seederów)',
          toolbar_tip: '💡 Kliknij wiersz, aby zobaczyć szczegóły i listę trackerów',
          th_title: 'Tytuł / Wydanie',
          th_category: 'Kategoria',
          th_size: 'Rozmiar',
          th_swarm: 'Seed / Peer',
          th_health: 'Status',
          th_date: 'Data',
          th_action: 'Akcja',
          state_ready: 'GOTOWY DO WYSZUKIWANIA',
          state_ready_desc: 'Wpisz hasło powyżej, aby pobrać metadane.',
          state_searching: 'WYSZUKIWANIE W ŹRÓDŁACH...',
          state_searching_desc: 'Wysyłanie równoległych zapytań do zatwierdzonych rejestrów...',
          state_empty: 'BRAK WYNIKÓW',
          state_empty_desc: 'Zmień frazę lub włącz więcej źródeł w ustawieniach.',
          state_bookmarks_empty: 'BRAK ZAPISANYCH TORRENTÓW',
          state_bookmarks_empty_desc: 'Kliknij ⭐, aby zapisać torrent offline.',
          toast_copied: '✓ Skopiowano link Magnet!',
          toast_copied_hash: '✓ Skopiowano InfoHash!',
          toast_bookmarked: '⭐ Dodano do zapisanych!',
          toast_unbookmarked: '✓ Usunięto z zapisanych.',
          toast_cached: '✓ Wyczyszczono pamięć podręczną!',
          toast_reset: '✓ Przywrócono ustawienia domyślne!',
          toast_at_least_one: 'Przynajmniej 1 źródło musi być aktywne!',
          modal_title: '⚙ USTAWIENIA I ZARZĄDZANIE ŹRÓDŁAMI',
          modal_inspector_title: '🔍 INSPEKTOR METADANYCH TORRENT',
          sec_lang: '🌐 Język interfejsu',
          sec_lang_desc: 'Wybierz preferowany język',
          sec_asian_movies: '🌸 Azjatyckie Kino & Anime',
          sec_global_movies: '🎬 Filmy & Seriale Globalne',
          sec_software: '💻 Oprogramowanie & Systemy',
          sec_games: '🎮 Gry PC & Repacki',
          sec_books: '📚 Książki & Dokumenty',
          sec_music: '🎵 Muzyka & Hi-Res Audio',
          sec_density: '🎨 Gęstość Tabeli',
          density_label: 'Odstępy między wierszami',
          density_compact: 'Kompaktowy',
          density_comfortable: 'Wygodny',
          sec_safe_mode: '🛡️ Tryb Bezpieczny & Filtr NSFW',
          safe_mode_label: 'Włącz tryb bezpieczny (ukrywaj treści dla dorosłych)',
          sec_torznab: '🔌 Prywatny Serwer (Torznab / Jackett)',
          torznab_desc: 'Połącz swój serwer Jackett/Prowlarr dla prywatnych trackerów',
          sec_privacy: '🛡️ Prywatność i Pamięć Podręczna',
          privacy_desc: 'Brak plików cookie śledzących, brak nieautoryzowanych proxy.',
          btn_purge_cache: 'Wyczyść pamięć podręczną',
          btn_export_bm: 'Eksportuj zapisane (JSON)',
          btn_import_bm: 'Importuj zapisane (JSON)',
          btn_reset: 'Resetuj',
          btn_done: 'Gotowe',
          btn_open_client: 'Otwórz w Kliencie Torrent'
        },
        uk: {
          nav_search: 'Пошук',
          nav_bookmarks: '⭐ Збережені',
          nav_invariants: 'Безпека',
          btn_theme_dark: 'Тема: Темна',
          btn_theme_light: 'Тема: Світла',
          btn_settings: '⚙ Налаштування',
          hero_sub_pre: 'Існує багато пошуковиків торрентів,',
          hero_sub_post: 'але цей — ',
          hero_orient: 'Мінімалістичний агрегатор метаданих із пріоритетом безпеки. Жодних довільних проксі, перевірені джерела.',
          tab_all: 'Усі категорії',
          tab_movies: '🎬 Фільми та Серіали',
          tab_anime: '🌸 Аніме та Дорами',
          tab_software: '💻 Програми та ОС',
          tab_games: '🎮 Комп’ютерні ігри',
          tab_books: '📚 Книги та Тексти',
          tab_music: '🎵 Музика Lossless',
          tab_bookmarks: '⭐ Збережені',
          search_placeholder: "Пошук метаданих (напр. 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Шукати',
          focus_tag: '[/] фокус',
          caption_title: 'ПЕРЕВІРЕНИЙ ПОТІК МЕТАДАНИХ',
          active_providers_suffix: 'Активно',
          label_sort_by: 'Сортування:',
          sort_seeders: 'Сіди ↓ (Найбільше)',
          sort_size_desc: 'Розмір ↓ (Великі)',
          sort_size_asc: 'Розмір ↑ (Маленькі)',
          sort_date_desc: 'Дата ↓ (Нові)',
          sort_title_asc: 'Назва (А → Я)',
          label_hide_dead: 'Приховати неактивні (0 Сідів)',
          toolbar_tip: '💡 Натисніть на рядок для перегляду деталей та списку трекерів',
          th_title: 'Назва / Реліз',
          th_category: 'Категорія',
          th_size: 'Розмір',
          th_swarm: 'Сіди / Лічі',
          th_health: 'Стан',
          th_date: 'Дата',
          th_action: 'Дія',
          state_ready: 'ГОТОВИЙ ДО ПОШУКУ У СВОРМІ',
          state_ready_desc: 'Введіть запит вище для збору безпечних метаданих.',
          state_searching: 'ПОШУК ЗА ДЖЕРЕЛАМИ...',
          state_searching_desc: 'Паралельне опитування перевірених реєстрів...',
          state_empty: 'НІЧОГО НЕ ЗНАЙДЕНО',
          state_empty_desc: 'Спробуйте змінити запит або увімкнути більше джерел.',
          state_bookmarks_empty: 'НЕМАЄ ЗБЕРЕЖЕНИХ ТОРРЕНТІВ',
          state_bookmarks_empty_desc: 'Натисніть ⭐ на рядку для збереження офлайн.',
          toast_copied: '✓ Magnet-посилання скопійовано!',
          toast_copied_hash: '✓ InfoHash скопійовано!',
          toast_bookmarked: '⭐ Додано до збережених!',
          toast_unbookmarked: '✓ Видалено зі збережених.',
          toast_cached: '✓ Кеш успішно очищено!',
          toast_reset: '✓ Налаштування скинуто!',
          toast_at_least_one: 'Щонайменше 1 джерело має бути активним!',
          modal_title: '⚙ НАЛАШТУВАННЯ ТА КЕРУВАННЯ ДЖЕРЕЛАМИ',
          modal_inspector_title: '🔍 ІНСПЕКТОР МЕТАДАНИХ ТОРРЕНТА',
          sec_lang: '🌐 Мова інтерфейсу',
          sec_lang_desc: 'Оберіть мову додатку',
          sec_asian_movies: '🌸 Азійське кіно та Аніме',
          sec_global_movies: '🎬 Світове кіно та Серіали',
          sec_software: '💻 Програми та Операційні системи',
          sec_games: '🎮 Ігри для ПК та Репаки',
          sec_books: '📚 Книги та Документи',
          sec_music: '🎵 Музика та Hi-Res Audio',
          sec_density: '🎨 Щільність таблиці',
          density_label: 'Інтервал між рядками',
          density_compact: 'Компактний',
          density_comfortable: 'Зручний',
          sec_safe_mode: '🛡️ Безпечний режим і фільтр NSFW',
          safe_mode_label: 'Увімкнути безпечний режим (приховувати контент 18+)',
          sec_torznab: '🔌 Власний сервер (Torznab / Jackett)',
          torznab_desc: 'Підключіть власний сервер Jackett/Prowlarr для приватних трекерів',
          sec_privacy: '🛡️ Конфіденційність та Кеш',
          privacy_desc: 'Жодних файлів cookie для відстеження, жодних сторонніх проксі.',
          btn_purge_cache: 'Очистити кеш та історію',
          btn_export_bm: 'Експорт збережених (JSON)',
          btn_import_bm: 'Імпорт збережених (JSON)',
          btn_reset: 'Скинути налаштування',
          btn_done: 'Готово',
          btn_open_client: 'Відкрити в Торрент-клієнті'
        },
        ar: {
          nav_search: 'بحث',
          nav_bookmarks: '⭐ المحفوظات',
          nav_invariants: 'الأمان',
          btn_theme_dark: 'المظهر: داكن',
          btn_theme_light: 'المظهر: فاتح',
          btn_settings: '⚙ الإعدادات',
          hero_sub_pre: 'هناك العديد من محركات بحث التورنت،',
          hero_sub_post: 'ولكن هذا هو ',
          hero_orient: 'مجمع بيانات تورنت فائق البساطة والأمان. بدون بروكسي عشوائي، ومصادر موثوقة ومفحوصة.',
          tab_all: 'جميع الفئات',
          tab_movies: '🎬 أفلام ومسلسلات',
          tab_anime: '🌸 أنمي ودراما آسيوية',
          tab_software: '💻 برامج وأنظمة تشغيل',
          tab_games: '🎮 ألعاب الكمبيوتر',
          tab_books: '📚 كتب ونصوص',
          tab_music: '🎵 موسيقى وصوتيات',
          tab_bookmarks: '⭐ المحفوظات',
          search_placeholder: "ابحث عن ملفات التورنت (مثل: 'avatar', 'ubuntu', 'elden ring')...",
          search_btn: 'بحث',
          focus_tag: '[/] تركيز',
          caption_title: 'موجز بيانات السرب المعتمد',
          active_providers_suffix: 'مفعل',
          label_sort_by: 'ترتيب حسب:',
          sort_seeders: 'الموزعون ↓ (الأعلى)',
          sort_size_desc: 'الحجم ↓ (الأكبر)',
          sort_size_asc: 'الحجم ↑ (الأصغر)',
          sort_date_desc: 'التاريخ ↓ (الأحدث)',
          sort_title_asc: 'العنوان (أ → ي)',
          label_hide_dead: 'إخفاء التورنت الميت (0 موزع)',
          toolbar_tip: '💡 اضغط على السطر لعرض التفاصيل وقائمة التراكر',
          th_title: 'العنوان / الإصدار',
          th_category: 'الفئة',
          th_size: 'الحجم',
          th_swarm: 'موزعون / محملون',
          th_health: 'الحالة',
          th_date: 'التاريخ',
          th_action: 'إجراء',
          state_ready: 'جاهز للبحث المباشر في السرب',
          state_ready_desc: 'اكتب كلمة البحث أعلاه لجمع البيانات الآمنة.',
          state_searching: 'جارٍ البحث في المصادر المعتمدة...',
          state_searching_desc: 'يتم الاستعلام بالتوازي من الخوادم المصرح بها...',
          state_empty: 'لم يتم العثور على نتائج',
          state_empty_desc: 'حاول تغيير عبارة البحث أو تفعيل مصادر أخرى في الإعدادات.',
          state_bookmarks_empty: 'لا توجد تورنتات محفوظة بعد',
          state_bookmarks_empty_desc: 'اضغط على رمز ⭐ في أي نتيجة لحفظها دون اتصال.',
          toast_copied: '✓ تم نسخ رابط المغناطيس (Magnet)!',
          toast_copied_hash: '✓ تم نسخ InfoHash!',
          toast_bookmarked: '⭐ تم الحفظ في المفضلة!',
          toast_unbookmarked: '✓ تم الحذف من المحفوظات.',
          toast_cached: '✓ تم مسح الذاكرة المؤقتة بنجاح!',
          toast_reset: '✓ تم استعادة الإعدادات الافتراضية!',
          toast_at_least_one: 'يجب تفعيل مصدر واحد على الأقل!',
          modal_title: '⚙ إعدادات المحرك وإدارة المصادر',
          modal_inspector_title: '🔍 فاحص بيانات التورنت التفصيلي',
          sec_lang: '🌐 لغة العرض (Language)',
          sec_lang_desc: 'اختر لغة واجهة المستخدم',
          sec_asian_movies: '🌸 السينما الآسيوية والأنمي',
          sec_global_movies: '🎬 السينما والمسلسلات العالمية',
          sec_software: '💻 البرامج وأنظمة التشغيل',
          sec_games: '🎮 ألعاب الكمبيوتر والألعاب المضغوطة',
          sec_books: '📚 الكتب والمستندات',
          sec_music: '🎵 الموسيقى والصوت عالي الدقة',
          sec_density: '🎨 كثافة الجدول',
          density_label: 'تباعد أسطر الجدول',
          density_compact: 'مضغوط (متقارب)',
          density_comfortable: 'مريح (افتراضي)',
          sec_safe_mode: '🛡️ الوضع الآمن وفلترة محتوى البالغين',
          safe_mode_label: 'تفعيل الوضع الآمن (إخفاء المحتوى الإباحي +18)',
          sec_torznab: '🔌 خادم Torznab مخصص (Jackett)',
          torznab_desc: 'ربط خادم Jackett/Prowlarr للبحث في التراكرات الخاصة',
          sec_privacy: '🛡️ الخصوصية والذاكرة المؤقتة',
          privacy_desc: 'بدون ملفات تتبع وبدون بروكسي غير مصرح به.',
          btn_purge_cache: 'مسح الذاكرة المؤقتة والسجل',
          btn_export_bm: 'تصدير المحفوظات (JSON)',
          btn_import_bm: 'استيراد المحفوظات (JSON)',
          btn_reset: 'استعادة الافتراضي',
          btn_done: 'تم',
          btn_open_client: 'فتح في برنامج التورنت'
        },
        fa: {
          nav_search: 'جستجو',
          nav_bookmarks: '⭐ ذخیره‌ها',
          nav_invariants: 'امنیت',
          btn_theme_dark: 'تم: تاریک',
          btn_theme_light: 'تم: روشن',
          btn_settings: '⚙ تنظیمات',
          hero_sub_pre: 'موتورهای جستجوی تورنت زیادی وجود دارد،',
          hero_sub_post: 'اما این یکی ',
          hero_orient: 'تجمیع‌کننده متادیتای تورنت با امنیت فوق‌العاده و سبک. بدون پروکسی‌های ناامن و با رتبه‌بندی قطعی.',
          tab_all: 'همه دسته‌ها',
          tab_movies: '🎬 فیلم و سریال',
          tab_anime: '🌸 انیمه و درام آسیایی',
          tab_software: '💻 نرم‌افزار و سیستم‌عامل',
          tab_games: '🎮 بازی‌های رایانه',
          tab_books: '📚 کتاب‌ها و متون',
          tab_music: '🎵 موسیقی و بدون افت کیفیت',
          tab_bookmarks: '⭐ ذخیره‌ها',
          search_placeholder: "جستجوی متادیتا (مثال: 'avatar', 'ubuntu', 'elden ring')...",
          search_btn: 'جستجو',
          focus_tag: '[/] فوکوس',
          caption_title: 'جریان متادیتای تایید شده',
          active_providers_suffix: 'فعال',
          label_sort_by: 'مرتب‌سازی بر اساس:',
          sort_seeders: 'سیدرها ↓ (بیشترین)',
          sort_size_desc: 'حجم ↓ (بزرگ‌ترین)',
          sort_size_asc: 'حجم ↑ (کوچک‌ترین)',
          sort_date_desc: 'تاریخ ↓ (جدیدترین)',
          sort_title_asc: 'عنوان (الف → ی)',
          label_hide_dead: 'مخفی کردن تورنت‌های مرده (۰ سیدر)',
          toolbar_tip: '💡 برای مشاهده متادیتا و لیست ترکرها روی ردیف کلیک کنید',
          th_title: 'عنوان / انتشار',
          th_category: 'دسته‌بندی',
          th_size: 'حجم',
          th_swarm: 'سیدرها / لیچرها',
          th_health: 'وضعیت',
          th_date: 'تاریخ',
          th_action: 'عملیات',
          state_ready: 'آماده جستجوی زنده در تورنت',
          state_ready_desc: 'عبارت مورد نظر خود را در بالا وارد کنید.',
          state_searching: 'در حال جستجو در منابع تایید شده...',
          state_searching_desc: 'درخواست همزمان به سرورهای رسمی...',
          state_empty: 'نتیجه‌ای یافت نشد',
          state_empty_desc: 'عبارت جستجو را تغییر دهید یا منابع بیشتری فعال کنید.',
          state_bookmarks_empty: 'هیچ تورنتی ذخیره نشده است',
          state_bookmarks_empty_desc: 'روی ⭐ کلیک کنید تا تورنت به صورت آفلاین ذخیره شود.',
          toast_copied: '✓ لینک مگنت کپی شد!',
          toast_copied_hash: '✓ کد هش کپی شد!',
          toast_bookmarked: '⭐ به ذخیره‌ها اضافه شد!',
          toast_unbookmarked: '✓ از ذخیره‌ها حذف شد.',
          toast_cached: '✓ کش با موفقیت پاک شد!',
          toast_reset: '✓ تنظیمات پیش‌فرض بازگردانده شد!',
          toast_at_least_one: 'حداقل ۱ منبع باید فعال باشد!',
          modal_title: '⚙ تنظیمات و مدیریت منابع',
          modal_inspector_title: '🔍 بازرس متادیتای تورنت',
          sec_lang: '🌐 زبان نمایش (Language)',
          sec_lang_desc: 'انتخاب زبان رابط کاربری',
          sec_asian_movies: '🌸 فیلم آسیایی و انیمه',
          sec_global_movies: '🎬 فیلم و سریال‌های جهانی',
          sec_software: '💻 نرم‌افزار و سیستم‌عامل',
          sec_games: '🎮 بازی‌های کامپیوتر و ریپک',
          sec_books: '📚 کتاب‌ها و مستندات',
          sec_music: '🎵 موسیقی با کیفیت بالا',
          sec_density: '🎨 تراکم جدول',
          density_label: 'فاصله خطوط جدول',
          density_compact: 'فشرده',
          density_comfortable: 'راحت',
          sec_safe_mode: '🛡️ حالت امن و فیلتر محتوای بزرگسال',
          safe_mode_label: 'فعال‌سازی حالت امن (فیلتر محتوای +۱۸)',
          sec_torznab: '🔌 اتصال به Torznab خصوصی (Jackett)',
          torznab_desc: 'اتصال سرور شخصی برای ترکرهای خصوصی',
          sec_privacy: '🛡️ حریم خصوصی و کش محلی',
          privacy_desc: 'بدون کوکی‌های ردیابی و بدون پروکسی‌های غیرمجاز.',
          btn_purge_cache: 'پاک‌سازی کش و تاریخچه',
          btn_export_bm: 'خروجی ذخیره‌ها (JSON)',
          btn_import_bm: 'ورودی ذخیره‌ها (JSON)',
          btn_reset: 'بازنشانی پیش‌فرض',
          btn_done: 'تکمیل',
          btn_open_client: 'باز کردن در برنامه تورنت'
        },
        hi: {
          nav_search: 'खोजें',
          nav_bookmarks: '⭐ सहेजे गए',
          nav_invariants: 'सुरक्षा',
          btn_theme_dark: 'थीम: डार्क',
          btn_theme_light: 'थीम: लाइट',
          btn_settings: '⚙ सेटिंग्स',
          hero_sub_pre: 'कई टॉरेंट सर्च इंजन उपलब्ध हैं,',
          hero_sub_post: 'लेकिन यह है ',
          hero_orient: 'सुरक्षा-प्रथम और मिनिमलिस्ट मेटाडेटा एग्रीगेटर। शून्य असुरक्षित प्रॉक्सी और सत्यापित स्रोतों से रैंकिंग।',
          tab_all: 'सभी श्रेणियां',
          tab_movies: '🎬 फिल्में और टीवी',
          tab_anime: '🌸 एनीमे और ड्रामा',
          tab_software: '💻 सॉफ्टवेयर और ओएस',
          tab_games: '🎮 पीसी गेम्स',
          tab_books: '📚 किताबें और ई-बुक्स',
          tab_music: '🎵 संगीत और ऑडियो',
          tab_bookmarks: '⭐ सहेजे गए',
          search_placeholder: "खोजने के लिए लिखें (जैसे: 'avatar', 'ubuntu', 'elden ring')...",
          search_btn: 'खोजें',
          focus_tag: '[/] फोकस',
          caption_title: 'सत्यापित टॉरेंट मेटाडेटा फीड',
          active_providers_suffix: 'सक्रिय',
          label_sort_by: 'क्रमबद्ध करें:',
          sort_seeders: 'सीडर्स ↓ (सर्वाधिक)',
          sort_size_desc: 'आकार ↓ (बड़ा)',
          sort_size_asc: 'आकार ↑ (छोटा)',
          sort_date_desc: 'तारीख ↓ (नवीनतम)',
          sort_title_asc: 'शीर्षक (A → Z)',
          label_hide_dead: 'निष्क्रिय टॉरेंट छिपाएं (0 सील्डर)',
          toolbar_tip: '💡 विस्तृत जानकारी और ट्रैकर्स देखने के लिए पंक्ति पर क्लिक करें',
          th_title: 'शीर्षक / रिलीज',
          th_category: 'श्रेणी',
          th_size: 'आकार',
          th_swarm: 'सीडर्स / लीचर्स',
          th_health: 'स्थिति',
          th_date: 'तारीख',
          th_action: 'कार्रवाई',
          state_ready: 'खोज के लिए तैयार',
          state_ready_desc: 'सत्यापित टॉरेंट मेटाडेटा खोजने के लिए ऊपर खोज शब्द लिखें।',
          state_searching: 'सत्यापित स्रोतों में खोज जारी है...',
          state_searching_desc: 'अनुमोदित प्रदाताओं से समानांतर खोज की जा रही है...',
          state_empty: 'कोई परिणाम नहीं मिला',
          state_empty_desc: 'कृपया खोज शब्द बदलें या सेटिंग्स में अधिक प्रदाता सक्षम करें।',
          state_bookmarks_empty: 'कोई टॉरेंट सहेजा नहीं गया है',
          state_bookmarks_empty_desc: 'ऑफ़लाइन सहेजने के लिए किसी भी परिणाम पर ⭐ आइकन पर क्लिक करें।',
          toast_copied: '✓ मैग्नेट लिंक कॉपी हो गया!',
          toast_copied_hash: '✓ InfoHash कॉपी हो गया!',
          toast_bookmarked: '⭐ पसंदीदा में सहेजा गया!',
          toast_unbookmarked: '✓ पसंदीदा से हटाया गया।',
          toast_cached: '✓ कैश सफलतापूर्वक साफ़ किया गया!',
          toast_reset: '✓ डिफ़ॉल्ट सेटिंग्स बहाल की गईं!',
          toast_at_least_one: 'कम से कम 1 प्रदाता सक्रिय होना चाहिए!',
          modal_title: '⚙ इंजन सेटिंग्स और प्रदाता प्रबंधन',
          modal_inspector_title: '🔍 टॉरेंट मेटाडेटा इंस्पेक्टर',
          sec_lang: '🌐 भाषा (Language)',
          sec_lang_desc: 'उपयोगकर्ता इंटरफ़ेस भाषा चुनें',
          sec_asian_movies: '🌸 एशियाई फिल्में और एनीमे',
          sec_global_movies: '🎬 वैश्विक फिल्में और सीरीज',
          sec_software: '💻 सॉफ्टवेयर और ऑपरेटिंग सिस्टम',
          sec_games: '🎮 पीसी गेम्स और रीपैक्स',
          sec_books: '📚 किताबें और ई-बुक्स',
          sec_music: '🎵 संगीत और उच्च गुणवत्ता ऑडियो',
          sec_density: '🎨 तालिका घनत्व',
          density_label: 'पंक्ति रिक्ति घनत्व',
          density_compact: 'कॉम्पैक्ट (सघन)',
          density_comfortable: 'आरामदायक (डिफ़ॉल्ट)',
          sec_safe_mode: '🛡️ सेफ मोड और 18+ फिल्टर',
          safe_mode_label: 'सेफ मोड चालू करें (वयस्क सामग्री छिपाएं)',
          sec_torznab: '🔌 कस्टम निजी इंडेक्स (Torznab / Jackett)',
          torznab_desc: 'प्राइवेट ट्रैकर्स के लिए अपना Jackett/Prowlarr सर्वर कनेक्ट करें',
          sec_privacy: '🛡️ गोपनीयता और स्थानीय कैश',
          privacy_desc: 'शून्य ट्रैकिंग कुकीज़, शून्य अनधिकृत प्रॉक्सी।',
          btn_purge_cache: 'कैश और इतिहास साफ़ करें',
          btn_export_bm: 'बुकमार्क निर्यात करें (JSON)',
          btn_import_bm: 'बुकमार्क आयात करें (JSON)',
          btn_reset: 'डिफ़ॉल्ट पर रीसेट करें',
          btn_done: 'हो गया',
          btn_open_client: 'टॉरेंट ऐप में खोलें'
        },
        bn: {
          nav_search: 'অনুসন্ধান',
          nav_bookmarks: '⭐ সংরক্ষিত',
          nav_invariants: 'নিরাপত্তা',
          btn_theme_dark: 'থিম: অন্ধকার',
          btn_theme_light: 'থিম: আলো',
          btn_settings: '⚙ সেটিংস',
          hero_sub_pre: 'অনেক টরেন্ট সার্চ ইঞ্জিন রয়েছে,',
          hero_sub_post: 'তবে এটি হলো আসল ',
          hero_orient: 'ন্যূনতম এবং নিরাপত্তা-প্রথম টরেন্ট মেটাডেটা সংগ্রহকারী। কোনো ঝুঁকিপূর্ণ প্রক্সি নেই, যাচাইকৃত উৎস।',
          tab_all: 'সকল বিভাগ',
          tab_movies: '🎬 চলচ্চিত্র ও সিরিজ',
          tab_anime: '🌸 অ্যানিমে ও নাটক',
          tab_software: '💻 সফটওয়্যার ও ওএস',
          tab_games: '🎮 গেমস',
          tab_books: '📚 বই ও টেক্সট',
          tab_music: '🎵 সংগীত ও গান',
          tab_bookmarks: '⭐ সংরক্ষিত',
          search_placeholder: "অনুসন্ধান করতে লিখুন (যেমন: 'avatar', 'ubuntu', 'elden ring')...",
          search_btn: 'অনুসন্ধান',
          focus_tag: '[/] ফোকাস',
          caption_title: 'যাচাইকৃত টরেন্ট মেটাডেটা ফিড',
          active_providers_suffix: 'সক্রিয়',
          label_sort_by: 'সাজানোর ক্রম:',
          sort_seeders: 'সিডার ↓ (সর্বোচ্চ)',
          sort_size_desc: 'আকার ↓ (বৃহত্তম)',
          sort_size_asc: 'আকার ↑ (ক্ষুদ্রতম)',
          sort_date_desc: 'তারিখ ↓ (নতুন)',
          sort_title_asc: 'শিরোনাম (A → Z)',
          label_hide_dead: 'নিষ্ক্রিয় টরেন্ট লুকান (০ সিডার)',
          toolbar_tip: '💡 ট্র্যাকারের তালিকা ও মেটাডেটা দেখতে সারিতে ক্লিক করুন',
          th_title: 'শিরোনাম / প্রকাশ',
          th_category: 'বিভাগ',
          th_size: 'আকার',
          th_swarm: 'সিডার / লিচার',
          th_health: 'অবস্থা',
          th_date: 'তারিখ',
          th_action: 'পদক্ষেপ',
          state_ready: 'লাইভ অনুসন্ধানের জন্য প্রস্তুত',
          state_ready_desc: 'নিরাপদ মেটাডেটা খুঁজতে উপরে সার্চ টার্ম লিখুন।',
          state_searching: 'উৎসগুলিতে অনুসন্ধান চলছে...',
          state_searching_desc: 'অনুমোদিত প্রদানকারীদের কাছে সমান্তরাল অনুরোধ পাঠানো হচ্ছে...',
          state_empty: 'কোনো ফলাফল পাওয়া যায়নি',
          state_empty_desc: 'অনুগ্রহ করে অনুসন্ধানের শব্দ পরিবর্তন করুন বা সেটিংসে আরও প্রদানকারী সক্রিয় করুন।',
          state_bookmarks_empty: 'কোনো সংরক্ষিত টরেন্ট নেই',
          state_bookmarks_empty_desc: 'অফলাইনে সংরক্ষণ করতে যেকোনো ফলাফলে ⭐ আইকনে ক্লিক করুন।',
          toast_copied: '✓ ম্যাগনেট লিঙ্ক কপি করা হয়েছে!',
          toast_copied_hash: '✓ InfoHash কপি করা হয়েছে!',
          toast_bookmarked: '⭐ সংরক্ষণে যুক্ত করা হয়েছে!',
          toast_unbookmarked: '✓ সংরক্ষণ থেকে সরানো হয়েছে।',
          toast_cached: '✓ ক্যাশ সফলভাবে পরিষ্কার করা হয়েছে!',
          toast_reset: '✓ ডিফল্ট সেটিংস পুনরুদ্ধার করা হয়েছে!',
          toast_at_least_one: 'কমপক্ষে ১টি উৎস সক্রিয় থাকতে হবে!',
          modal_title: '⚙ ইঞ্জিন সেটিংস এবং উৎস ব্যবস্থাপনা',
          modal_inspector_title: '🔍 টরেন্ট মেটাডেটা পরিদর্শক',
          sec_lang: '🌐 প্রদর্শনের ভাষা (Language)',
          sec_lang_desc: 'ইউজার ইন্টারফেসের ভাষা নির্বাচন করুন',
          sec_asian_movies: '🌸 এশিয়ান সিনেমা ও অ্যানিমে',
          sec_global_movies: '🎬 বৈশ্বিক সিনেমা ও সিরিজ',
          sec_software: '💻 সফটওয়্যার ও অপারেটিং সিস্টেম',
          sec_games: '🎮 পিসি গেমস ও রীপ্যাক',
          sec_books: '📚 বই ও নথিপত্র',
          sec_music: '🎵 গান ও হাই-রেস অডিও',
          sec_density: '🎨 টেবিল ব্যবধান ঘনত্ব',
          density_label: 'লাইন ব্যবধান',
          density_compact: 'কমপ্যাক্ট (ঘন)',
          density_comfortable: 'স্বাচ্ছন্দ্যময়',
          sec_safe_mode: '🛡️ সেফ মোড ও প্রাপ্তবয়স্ক ফিল্টার',
          safe_mode_label: 'সেফ মোড সক্রিয় করুন (১৮+ কন্টেন্ট লুকান)',
          sec_torznab: '🔌 ব্যক্তিগত Torznab সার্ভার (Jackett)',
          torznab_desc: 'ব্যক্তিগত ট্র্যাকারের জন্য Jackett/Prowlarr সংযোগ করুন',
          sec_privacy: '🛡️ গোপনীয়তা ও স্থানীয় ক্যাশ',
          privacy_desc: 'কোনো ট্র্যাকিং কুকি নেই, কোনো অননুমোদিত প্রক্সি নেই।',
          btn_purge_cache: 'ক্যাশ ও ইতিহাস পরিষ্কার করুন',
          btn_export_bm: 'সংরক্ষণ রপ্তানি করুন (JSON)',
          btn_import_bm: 'সংরক্ষণ আমদানি করুন (JSON)',
          btn_reset: 'রিসেট করুন',
          btn_done: 'সম্পন্ন',
          btn_open_client: 'টরেন্ট ক্লায়েন্টে খুলুন'
        },
        ro: {
          nav_search: 'Căutare',
          nav_bookmarks: '⭐ Salvate',
          nav_invariants: 'Securitate',
          btn_theme_dark: 'Temă: Întunecată',
          btn_theme_light: 'Temă: Luminoasă',
          btn_settings: '⚙ Setări',
          hero_sub_pre: 'Există multe motoare de căutare torente,',
          hero_sub_post: 'dar acesta este ',
          hero_orient: 'Agregator de metadate minimalist și axat pe securitate. Fără proxy arbitrar, surse verificate și clasare multi-semnal.',
          tab_all: 'Toate Categoriile',
          tab_movies: '🎬 Filme & Seriale',
          tab_anime: '🌸 Anime & Drame Asiatice',
          tab_software: '💻 Software & OS',
          tab_games: '🎮 Jocuri PC',
          tab_books: '📚 Cărți & Ebook-uri',
          tab_music: '🎵 Muzică & FLAC',
          tab_bookmarks: '⭐ Salvate',
          search_placeholder: "Căutați torente (ex: 'avatar', 'elden ring', 'ubuntu')...",
          search_btn: 'Căutare',
          focus_tag: '[/] focalizează',
          caption_title: 'FLUX DE METADATE VERIFICAT',
          active_providers_suffix: 'Active',
          label_sort_by: 'Sortează după:',
          sort_seeders: 'Seeders ↓ (Cei mai mulți)',
          sort_size_desc: 'Mărime ↓ (Cea mai mare)',
          sort_size_asc: 'Mărime ↑ (Cea mai mică)',
          sort_date_desc: 'Dată ↓ (Cele mai noi)',
          sort_title_asc: 'Titlu (A → Z)',
          label_hide_dead: 'Ascunde torente moarte (0 Seeders)',
          toolbar_tip: '💡 Faceți clic pe un rând pentru a inspecta metadatele',
          th_title: 'Titlu / Versiune',
          th_category: 'Categorie',
          th_size: 'Mărime',
          th_swarm: 'Seeders / Leechers',
          th_health: 'Stare',
          th_date: 'Dată',
          th_action: 'Acțiune',
          state_ready: 'GATA DE CĂUTARE ÎN TIMP REAL',
          state_ready_desc: 'Introduceți un termen sus pentru a agrega metadate sigure.',
          state_searching: 'CĂUTARE ÎN SURSELE VERIFICATE...',
          state_searching_desc: 'Se interoghează furnizorii aprobați în paralel...',
          state_empty: 'NICIUN REZULTAT GĂSIT',
          state_empty_desc: 'Modificați termenul de căutare sau activați mai multe surse.',
          state_bookmarks_empty: 'NICIUN TORENT SALVAT',
          state_bookmarks_empty_desc: 'Faceți clic pe ⭐ pentru a salva offline.',
          toast_copied: '✓ Link Magnet copiat!',
          toast_copied_hash: '✓ InfoHash copiat!',
          toast_bookmarked: '⭐ Adăugat la favorite!',
          toast_unbookmarked: '✓ Șters din favorite.',
          toast_cached: '✓ Cache curățat cu succes!',
          toast_reset: '✓ Setări implicite restaurate!',
          toast_at_least_one: 'Cel puțin 1 sursă trebuie să fie activă!',
          modal_title: '⚙ SETĂRI MOTOR & GESTIUNE SURSE',
          modal_inspector_title: '🔍 INSPECTOR METADATE TORENT',
          sec_lang: '🌐 Limba de afișare',
          sec_lang_desc: 'Selectați limba interfeței',
          sec_asian_movies: '🌸 Filme Asiatice & Anime',
          sec_global_movies: '🎬 Filme & Seriale Globale',
          sec_software: '💻 Software & Sisteme de Operare',
          sec_games: '🎮 Jocuri PC & Repack-uri',
          sec_books: '📚 Cărți & Documente',
          sec_music: '🎵 Muzică & Audio Hi-Res',
          sec_density: '🎨 Densitatea Tabelului',
          density_label: 'Spațierea rândurilor',
          density_compact: 'Compact',
          density_comfortable: 'Confortabil',
          sec_safe_mode: '🛡️ Mod Sigur & Filtru NSFW',
          safe_mode_label: 'Activare Mod Sigur (ascunde conținutul pentru adulți)',
          sec_torznab: '🔌 Server Privat (Torznab / Jackett)',
          torznab_desc: 'Conectați serverul Jackett/Prowlarr personal',
          sec_privacy: '🛡️ Confidențialitate & Cache',
          privacy_desc: 'Fără cookie-uri de urmărire, fără proxy neautorizat.',
          btn_purge_cache: 'Curăță Cache & Istoric',
          btn_export_bm: 'Exportă Favorite (JSON)',
          btn_import_bm: 'Importă Favorite (JSON)',
          btn_reset: 'Resetează la Implicit',
          btn_done: 'Finalizat',
          btn_open_client: 'Deschide în Clientul Torrent'
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
        navLinkAeropad: document.getElementById('nav-link-aeropad'),
        navLinkAbout: document.getElementById('nav-link-about'),
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
        if (el.navLinkAeropad) el.navLinkAeropad.textContent = '📝 Aeropad';
        if (el.navLinkAbout) el.navLinkAbout.textContent = 'ℹ️ About';
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

        const ecoTitle = document.getElementById('footer-eco-title');
        const aeropadDesc = document.getElementById('footer-aeropad-desc');
        const resTitle = document.getElementById('footer-res-title');
        const edgeTitle = document.getElementById('footer-edge-title');

        if (ecoTitle) ecoTitle.textContent = t('footer_eco_title') || '🚀 ECOSYSTEM & OTHER PRODUCTS';
        if (aeropadDesc) aeropadDesc.textContent = t('footer_aeropad_desc') || 'Zero-Log ephemeral metadata scratchpad and batch magnet extractor for torrent swarms. Export directly to torrent clients.';
        if (resTitle) resTitle.textContent = t('footer_res_title') || '📚 RESOURCES & DOCUMENTATION';
        if (edgeTitle) edgeTitle.textContent = t('footer_edge_title') || '⚡ EDGE DEPLOYMENTS';
        
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
            '<span class="badge badge-accent">● Verified RFC-BTIH</span>' +
            (item.publishedAt ? '<span class="badge" style="font-family:var(--font-mono);">' + item.publishedAt.split('T')[0] + '</span>' : '') +
          '</div>';

        // Swarm & Size Details
        const metricsGrid = document.createElement('div');
        metricsGrid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem;';
        metricsGrid.innerHTML = 
          '<div style="padding:0.75rem; background:var(--color-bg-canvas); border:var(--border-subtle); border-radius:var(--radius-xs); text-align:center;">' +
            '<div style="font-size:0.6875rem; color:var(--color-text-muted); text-transform:uppercase;">' + t('th_size') + '</div>' +
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

        // Category Filter
        if (state.selectedCategory !== 'ALL' && state.selectedCategory !== 'BOOKMARKS') {
          if (state.selectedCategory === 'MOVIES') {
            list = list.filter(item => ['Movies', 'TV'].includes(item.category) || /(1080p|2160p|720p|4k|bluray|web-dl|x264|x265|hevc|remux|dvdrip|hdrip|season|s0\d|e0\d|movie)/i.test(item.title));
          } else if (state.selectedCategory === 'ANIME') {
            list = list.filter(item => item.category === 'Anime' || /(anime|nyaa|dmhy|bangumi|manga|acg)/i.test(item.title));
          } else if (state.selectedCategory === 'GAMES') {
            list = list.filter(item => item.category === 'Games' || /(repack|fitgirl|dodi|iso|game|switch|nsp|xci|gog)/i.test(item.title));
          } else if (state.selectedCategory === 'SOFTWARE') {
            list = list.filter(item => ['Software', 'OS'].includes(item.category) || /(setup|installer|x64|windows|macos|linux|portable)/i.test(item.title));
          } else if (state.selectedCategory === 'BOOKS') {
            list = list.filter(item => item.category === 'Books' || /(pdf|epub|mobi|cbz|cbr|book)/i.test(item.title));
          } else if (state.selectedCategory === 'MUSIC') {
            list = list.filter(item => item.category === 'Music' || /(flac|mp3|lossless|audio|soundtrack|ost)/i.test(item.title));
          }
        }

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
          list.sort((a, b) => {
            const seedDiff = (b.seeders || 0) - (a.seeders || 0);
            if (seedDiff !== 0) return seedDiff;
            return (b.sizeBytes || 0) - (a.sizeBytes || 0);
          });
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
          tdStar.className = 'col-star';
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
          tdTitle.className = 'col-title item-title-col';
          const titleLink = document.createElement('span');
          titleLink.className = 'item-title-link';
          titleLink.textContent = item.title;
          titleLink.title = item.title;

          const metaRow = document.createElement('div');
          metaRow.className = 'item-meta-row';
          metaRow.innerHTML = '<span class="badge">' + (item.sourceId || 'verified') + '</span> <span style="font-family:var(--font-mono);">' + (item.infoHash ? item.infoHash.substring(0, 12) + '...' : '') + '</span>';

          tdTitle.append(titleLink, metaRow);

          const tdCat = document.createElement('td');
          tdCat.className = 'col-cat';
          tdCat.innerHTML = '<span class="badge badge-accent">' + (item.category || 'Other') + '</span> ' +
            '<span class="badge">' + (item.sourceId || 'verified') + '</span> ' +
            (item.publishedAt ? '<span class="badge" style="font-family:var(--font-mono);">' + item.publishedAt.split('T')[0] + '</span>' : '');

          const tdSize = document.createElement('td');
          tdSize.className = 'col-size';
          tdSize.style.fontFamily = 'var(--font-mono)';
          tdSize.textContent = formatBytes(item.sizeBytes);

          const tdSwarm = document.createElement('td');
          tdSwarm.className = 'col-swarm';
          tdSwarm.style.fontFamily = 'var(--font-mono)';
          tdSwarm.innerHTML = '<span style="color:var(--color-text-accent)">▲' + (item.seeders || 0) + '</span> <span style="color:var(--color-text-muted)">▼' + (item.leechers || 0) + '</span>';

          const tdHealth = document.createElement('td');
          tdHealth.className = 'col-health';
          tdHealth.innerHTML = '<span class="badge badge-accent">● Verified</span>';

          const tdDate = document.createElement('td');
          tdDate.className = 'col-date';
          tdDate.style.fontFamily = 'var(--font-mono)';
          tdDate.textContent = item.publishedAt ? item.publishedAt.split('T')[0] : 'Recent';

          const tdActions = document.createElement('td');
          tdActions.className = 'col-actions';
          tdActions.style.textAlign = 'right';

          const mobileStats = document.createElement('div');
          mobileStats.className = 'mobile-inline-stats';
          mobileStats.innerHTML = '<span style="font-weight:700; color:var(--color-text-primary); font-size:0.875rem;">' + formatBytes(item.sizeBytes) + '</span> ' +
            '<span style="color:var(--color-text-accent); font-weight:600;">▲' + (item.seeders || 0) + '</span> ' +
            '<span style="color:var(--color-text-muted);">▼' + (item.leechers || 0) + '</span>';

          const copyBtn = document.createElement('button');
          copyBtn.className = 'button button--primary button--sm';
          copyBtn.textContent = 'Magnet 🧲';
          copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (item.magnetUri) {
              navigator.clipboard?.writeText(item.magnetUri).catch(() => {});
              showToast(t('toast_copied'));
            }
          });
          tdActions.append(mobileStats, copyBtn);

          // Click on row to open Inspector Modal
          tr.addEventListener('click', () => openInspectorModal(item));

          tr.append(tdStar, tdTitle, tdCat, tdSize, tdSwarm, tdHealth, tdDate, tdActions);
          el.resultsBody.appendChild(tr);
        });

        el.resultCount.textContent = displayItems.length + ' items';
      }

      async function executeLiveSearch(query) {
        const trimmed = query.trim();
        state.query = trimmed;
        if (state.selectedCategory === 'BOOKMARKS') {
          renderResults();
          return;
        }

        if (trimmed.length === 0) {
          state.items = [];
          state.isLoading = false;
          renderResults();
          return;
        }

        state.isLoading = true;
        state.items = [];
        renderResults();

        const startTime = performance.now();
        const providers = Array.from(state.enabledProviders);
        const seenKeys = new Set();

        const promises = providers.map(async (providerId) => {
          try {
            const res = await fetch('/api/v1/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ provider: providerId, query: trimmed, category: state.selectedCategory })
            });
            if (res.ok) {
              const json = await res.json();
              if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                const freshItems = [];
                for (const item of json.data) {
                  const key = (item.infoHash || item.id || '').toLowerCase();
                  if (key && !seenKeys.has(key)) {
                    seenKeys.add(key);
                    freshItems.push(item);
                  }
                }
                if (freshItems.length > 0) {
                  state.items = [...state.items, ...freshItems];
                  state.isLoading = false;
                  el.searchLatency.textContent = (performance.now() - startTime).toFixed(1) + ' ms';
                  renderResults();
                }
              }
            }
          } catch {}
        });

        await Promise.allSettled(promises);
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
              '<option value="zh"' + (state.lang === 'zh' ? ' selected' : '') + '>🇨🇳 中文 (简体)</option>' +
              '<option value="ja"' + (state.lang === 'ja' ? ' selected' : '') + '>🇯🇵 日本語</option>' +
              '<option value="ko"' + (state.lang === 'ko' ? ' selected' : '') + '>🇰🇷 한국어</option>' +
              '<option value="id"' + (state.lang === 'id' ? ' selected' : '') + '>🇮🇩 Bahasa Indonesia</option>' +
              '<option value="es"' + (state.lang === 'es' ? ' selected' : '') + '>🇪🇸 Español</option>' +
              '<option value="fr"' + (state.lang === 'fr' ? ' selected' : '') + '>🇫🇷 Français</option>' +
              '<option value="de"' + (state.lang === 'de' ? ' selected' : '') + '>🇩🇪 Deutsch</option>' +
              '<option value="ru"' + (state.lang === 'ru' ? ' selected' : '') + '>🇷🇺 Русский</option>' +
              '<option value="pt"' + (state.lang === 'pt' ? ' selected' : '') + '>🇧🇷 Português</option>' +
              '<option value="it"' + (state.lang === 'it' ? ' selected' : '') + '>🇮🇹 Italiano</option>' +
              '<option value="tr"' + (state.lang === 'tr' ? ' selected' : '') + '>🇹🇷 Türkçe</option>' +
              '<option value="pl"' + (state.lang === 'pl' ? ' selected' : '') + '>🇵🇱 Polski</option>' +
              '<option value="uk"' + (state.lang === 'uk' ? ' selected' : '') + '>🇺🇦 Українська</option>' +
              '<option value="ar"' + (state.lang === 'ar' ? ' selected' : '') + '>🇸🇦 العربية</option>' +
              '<option value="fa"' + (state.lang === 'fa' ? ' selected' : '') + '>🇮🇷 فارسی</option>' +
              '<option value="hi"' + (state.lang === 'hi' ? ' selected' : '') + '>🇮🇳 हिन्दी</option>' +
              '<option value="bn"' + (state.lang === 'bn' ? ' selected' : '') + '>🇧🇩 বাংলা</option>' +
              '<option value="ro"' + (state.lang === 'ro' ? ' selected' : '') + '>🇷🇴 Română</option>' +
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

      function openAeropadModal() {
        el.modalTitle.textContent = '📝 AEROPAD — ZERO-LOG MAGNET & SWARM SCRATCHPAD';
        el.modalBody.replaceChildren();

        const padDiv = document.createElement('div');
        padDiv.innerHTML = '<div style="font-size:0.875rem; color:var(--color-text-muted); margin-bottom:1rem; line-height:1.5;">' +
          'Paste raw magnet links, hash lists, or release notes below. Aeropad automatically extracts all valid magnets for 1-click batch copy or client handoff.' +
        '</div>' +
        '<textarea id="aeropad-textarea" style="width:100%; height:150px; background:var(--color-bg-canvas); color:var(--color-text-primary); border:var(--border-subtle); border-radius:var(--radius-xs); padding:0.75rem; font-family:var(--font-mono); font-size:0.8125rem; resize:vertical; box-sizing:border-box;" placeholder="Paste magnet:?xt=urn:btih:... links or raw text here..."></textarea>' +
        '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; flex-wrap:wrap; gap:0.5rem;">' +
          '<div id="aeropad-status" style="font-size:0.8125rem; font-weight:700; color:var(--color-text-accent);">0 magnets parsed</div>' +
          '<div style="display:flex; gap:0.5rem;">' +
            '<button type="button" id="btn-aeropad-copy-all" class="button button--primary button--sm">Copy All Magnets 🧲</button>' +
            '<button type="button" id="btn-aeropad-export-txt" class="button button--sm">Download .txt</button>' +
            '<button type="button" id="btn-aeropad-clear" class="button button--sm">Clear Pad</button>' +
          '</div>' +
        '</div>' +
        '<div id="aeropad-parsed-list" style="margin-top:1rem; max-height:200px; overflow-y:auto; display:flex; flex-direction:column; gap:0.5rem;"></div>';

        el.modalBody.appendChild(padDiv);
        el.modalBackdrop.classList.remove('is-hidden');

        setTimeout(() => {
          const textarea = document.getElementById('aeropad-textarea');
          const status = document.getElementById('aeropad-status');
          const listDiv = document.getElementById('aeropad-parsed-list');
          const copyAllBtn = document.getElementById('btn-aeropad-copy-all');
          const exportTxtBtn = document.getElementById('btn-aeropad-export-txt');
          const clearBtn = document.getElementById('btn-aeropad-clear');

          const savedPad = localStorage.getItem('cherrytor_aeropad_content') || '';
          if (textarea) textarea.value = savedPad;

          function parseMagnets() {
            const text = textarea ? textarea.value : '';
            localStorage.setItem('cherrytor_aeropad_content', text);
            const lines = text.split(String.fromCharCode(10));
            const uniqueMagnets = new Set();
            const hexRegex = /[0-9a-fA-F]{40}/;

            lines.forEach((line) => {
              const trimmed = line.trim();
              if (!trimmed) return;
              const magIdx = trimmed.indexOf('magnet:?');
              if (magIdx !== -1) {
                let endIdx = trimmed.length;
                for (let i = magIdx; i < trimmed.length; i++) {
                  const ch = trimmed.charCodeAt(i);
                  if (ch <= 32 || ch === 34 || ch === 39 || ch === 60 || ch === 62) {
                    endIdx = i;
                    break;
                  }
                }
                const rawMag = trimmed.substring(magIdx, endIdx);
                if (rawMag) uniqueMagnets.add(rawMag.replace(/&amp;/g, '&'));
              } else {
                const hexMatch = hexRegex.exec(trimmed);
                if (hexMatch) {
                  uniqueMagnets.add('magnet:?xt=urn:btih:' + hexMatch[0].toLowerCase());
                }
              }
            });

            const arr = Array.from(uniqueMagnets);
            if (status) status.textContent = arr.length + ' magnet link' + (arr.length === 1 ? '' : 's') + ' parsed';

            if (listDiv) {
              listDiv.replaceChildren();
              arr.forEach((mag) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'code-box';
                itemDiv.style.display = 'flex';
                itemDiv.style.justifyContent = 'space-between';
                itemDiv.style.alignItems = 'center';
                itemDiv.style.padding = '0.5rem 0.75rem';
                itemDiv.innerHTML = '<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:80%; font-size:0.75rem;">' + mag + '</span>' +
                  '<button type="button" class="button button--sm button--primary" style="padding:0.25rem 0.5rem; font-size:0.75rem;">Copy</button>';
                
                const btn = itemDiv.querySelector('button');
                if (btn) {
                  btn.addEventListener('click', () => {
                    navigator.clipboard?.writeText(mag).catch(() => {});
                    showToast(t('toast_copied'));
                  });
                }
                listDiv.appendChild(itemDiv);
              });
            }
          }

          if (textarea) {
            textarea.addEventListener('input', parseMagnets);
            parseMagnets();
          }

          if (copyAllBtn) {
            copyAllBtn.addEventListener('click', () => {
              const arr = Array.from(document.querySelectorAll('#aeropad-parsed-list .code-box span')).map(s => s.textContent);
              if (arr.length > 0) {
                navigator.clipboard?.writeText(arr.join(String.fromCharCode(10))).catch(() => {});
                showToast('✓ ' + arr.length + ' magnets copied to clipboard!');
              } else {
                showToast('No valid magnets found to copy.');
              }
            });
          }

          if (exportTxtBtn) {
            exportTxtBtn.addEventListener('click', () => {
              const arr = Array.from(document.querySelectorAll('#aeropad-parsed-list .code-box span')).map(s => s.textContent);
              const blob = new Blob([arr.join(String.fromCharCode(10))], { type: 'text/plain;charset=utf-8' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = 'aeropad_magnets.txt';
              a.click();
              a.remove();
              showToast('✓ Exported aeropad_magnets.txt');
            });
          }

          if (clearBtn) {
            clearBtn.addEventListener('click', () => {
              if (textarea) textarea.value = '';
              localStorage.removeItem('cherrytor_aeropad_content');
              parseMagnets();
              showToast('✓ Aeropad cleared');
            });
          }
        }, 50);
      }

      function openAboutModal() {
        el.modalTitle.textContent = 'ℹ️ ABOUT CHERRYTOR & AEROPAD';
        el.modalBody.replaceChildren();

        const aboutDiv = document.createElement('div');
        aboutDiv.innerHTML = '<div style="font-size:0.875rem; color:var(--color-text-muted); line-height:1.6;">' +
          '<div style="font-size:1.15rem; font-weight:800; color:var(--color-text-primary); margin-bottom:0.5rem;">' +
            '⚡ The Ultra-Fast, Security-First, Zero-Log Swarm Aggregator' +
          '</div>' +
          '<p style="margin-bottom:1rem;">' +
            '<strong>CherryTor</strong> and its companion tool <strong>Aeropad</strong> provide a modern, private, and high-density swarm metadata exploration experience running on Cloudflare Serverless Edge.' +
          '</p>' +
          '<div class="settings-group">' +
            '<div class="settings-group-title"><span>🛡️ Core Architecture &amp; Guarantees</span></div>' +
            '<ul style="margin:0.5rem 0 0 1.25rem; font-size:0.8125rem; color:var(--color-text-primary); line-height:1.7;">' +
              '<li><strong>Zero-Log Invariant:</strong> No IP tracking, no search history logs, zero analytics trackers.</li>' +
              '<li><strong>15+ Global Upstreams:</strong> Parallel aggregation across ThePirateBay, DMHY, Nyaa, ACG.RIP, Bangumi, YTS, EZTV, FitGirl, DODI, Archive.org.</li>' +
              '<li><strong>Aeropad Scratchpad:</strong> Offline client-side magnet extractor and batch dispatcher.</li>' +
              '<li><strong>Multi-Signal Classifier:</strong> Instant real-time category filtering (Movies, Anime, Games, Software, Books, Music).</li>' +
            '</ul>' +
          '</div>' +
          '<div class="settings-group">' +
            '<div class="settings-group-title"><span>🌐 Official Web Addresses</span></div>' +
            '<div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8125rem; font-family:var(--font-mono);">' +
              '<div>• Custom Domain: <a href="https://cherrytor.io.vn" target="_blank" style="color:var(--color-cyan-400);">https://cherrytor.io.vn</a></div>' +
              '<div>• Edge Mirror: <a href="https://tor.oaichuhust.workers.dev" target="_blank" style="color:var(--color-text-accent);">https://tor.oaichuhust.workers.dev</a></div>' +
              '<div>• GitHub Source: <a href="https://github.com/oaichu/CherryTor" target="_blank" style="color:var(--color-text-primary);">https://github.com/oaichu/CherryTor</a></div>' +
            '</div>' +
          '</div>' +
        '</div>';

        el.modalBody.appendChild(aboutDiv);
        el.modalBackdrop.classList.remove('is-hidden');
      }

      function closeSettingsModal() {
        el.modalBackdrop.classList.add('is-hidden');
      }

      window.openAeropadModal = openAeropadModal;
      window.openAboutModal = openAboutModal;
      window.openSettingsModal = openSettingsModal;
      window.closeSettingsModal = closeSettingsModal;

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
        if (el.navLinkAeropad) el.navLinkAeropad.addEventListener('click', openAeropadModal);
        if (el.navLinkAbout) el.navLinkAbout.addEventListener('click', openAboutModal);
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

        el.searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            clearTimeout(timer);
            executeLiveSearch(el.searchInput.value);
          }
        });

        el.searchTriggerBtn.addEventListener('click', () => {
          clearTimeout(timer);
          executeLiveSearch(el.searchInput.value);
        });

        el.navLinkBookmarks.addEventListener('click', () => {
          document.querySelectorAll('.switcher-tab').forEach(b => b.classList.remove('is-active'));
          el.tabBookmarks.classList.add('is-active');
          state.selectedCategory = 'BOOKMARKS';
          renderResults();
        });

        if (el.navLinkAeropad) {
          el.navLinkAeropad.addEventListener('click', () => {
            openAeropadModal();
          });
        }

        if (el.navLinkAbout) {
          el.navLinkAbout.addEventListener('click', () => {
            openAboutModal();
          });
        }

        document.querySelectorAll('.filter-chip').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            state.selectedCategory = btn.getAttribute('data-category') || 'ALL';
            if (state.selectedCategory === 'BOOKMARKS' || state.items.length > 0) {
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
