/**
 * CHERRYTOR PREVIEW ENGINE — PI.DEV EDITION
 * Interactive Prototype implementing Safe DOM textContent rendering,
 * Search Filtering, Ranking Explainability, Magnet Inspector, and Privacy Controls.
 */

(function () {
  'use strict';

  // --- State ---
  const state = {
    query: '',
    selectedCategory: 'ALL',
    minSeeders: 0,
    sortBy: 'ranking', // 'ranking' | 'seeders' | 'size' | 'freshness'
    sortDirection: 'desc',
    density: 'comfortable', // 'comfortable' | 'compact'
    theme: 'dark', // 'dark' | 'light'
    enabledProviders: new Set(window.CHERRYTOR_PROVIDERS.map(p => p.id).filter(id => id !== 'untrusted-feed')),
    selectedItemId: null,
    historyEnabled: true,
    searchHistory: ['ubuntu 24.04', 'blender benchmark', 'arch linux kernel']
  };

  // --- DOM Elements ---
  const el = {
    searchInput: document.getElementById('search-input'),
    providerToggles: document.getElementById('provider-toggles'),
    resultsBody: document.getElementById('results-tbody'),
    resultCount: document.getElementById('result-count'),
    searchLatency: document.getElementById('search-latency'),
    activeProviderCount: document.getElementById('active-provider-count'),
    themeToggleBtn: document.getElementById('btn-toggle-theme'),
    densityToggleBtn: document.getElementById('btn-toggle-density'),
    settingsBtn: document.getElementById('btn-open-settings'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalActionBtn: document.getElementById('modal-action-btn'),
    toast: document.getElementById('toast-notification')
  };

  // --- Formatting Helpers ---
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatDate(isoString) {
    if (!isoString) return 'Unknown';
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  }

  function getHealthCategory(seeders) {
    if (seeders >= 1000) return { label: 'HIGH', className: 'badge-accent', score: '● High Swarm' };
    if (seeders >= 100) return { label: 'MEDIUM', className: 'badge', score: '● Moderate' };
    if (seeders > 0) return { label: 'LOW', className: 'badge-cherry', score: '▲ Low Seed' };
    return { label: 'INACTIVE', className: 'badge-cherry', score: '× Inactive' };
  }

  // --- Toast Notification ---
  function showToast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.remove('is-hidden');
    setTimeout(() => {
      el.toast.classList.add('is-hidden');
    }, 2400);
  }

  // --- Safe Magnet Inspector Parser (AATP-0505) ---
  function parseMagnetSafe(uri) {
    if (!uri || !uri.startsWith('magnet:?')) {
      return { valid: false, error: 'Scheme must begin strictly with magnet:?' };
    }

    try {
      const url = new URL(uri);
      const params = new URLSearchParams(url.search);
      const xt = params.get('xt');
      const dn = params.get('dn') || 'Unnamed';
      const trackers = params.getAll('tr');

      if (!xt || !xt.startsWith('urn:btih:')) {
        return { valid: false, error: 'Invalid or missing xt=urn:btih:<hash> parameter' };
      }

      const infoHash = xt.replace('urn:btih:', '').trim();
      const isHex40 = /^[0-9a-fA-F]{40}$/.test(infoHash);
      const isBase32 = /^[2-7a-zA-Z]{32}$/.test(infoHash);

      if (!isHex40 && !isBase32) {
        return { valid: false, error: 'InfoHash failed length/entropy verification' };
      }

      return {
        valid: true,
        displayName: dn,
        infoHash: infoHash.toLowerCase(),
        trackers: trackers,
        rawUri: uri
      };
    } catch (e) {
      return { valid: false, error: 'Malformed magnet URI encoding' };
    }
  }

  // --- Render Providers ---
  function renderProviders() {
    el.providerToggles.replaceChildren();

    window.CHERRYTOR_PROVIDERS.forEach(provider => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'feed-pill';
      if (state.enabledProviders.has(provider.id)) {
        btn.classList.add('is-active');
      }

      const label = document.createElement('span');
      label.textContent = `${provider.name}`;
      btn.appendChild(label);

      btn.addEventListener('click', () => {
        if (state.enabledProviders.has(provider.id)) {
          state.enabledProviders.delete(provider.id);
        } else {
          state.enabledProviders.add(provider.id);
        }
        renderProviders();
        filterAndRenderResults();
      });

      el.providerToggles.appendChild(btn);
    });

    el.activeProviderCount.textContent = `${state.enabledProviders.size} Active`;
  }

  // --- Render Results Table (SAFE TEXTCONTENT — AATP-0501) ---
  function filterAndRenderResults() {
    const queryLower = state.query.toLowerCase().trim();
    const startTime = performance.now();

    // 1. Filter
    let items = window.CHERRYTOR_FIXTURES.filter(item => {
      if (!state.enabledProviders.has(item.sourceId)) return false;

      if (state.selectedCategory !== 'ALL' && item.category.toUpperCase() !== state.selectedCategory) {
        return false;
      }

      if (queryLower.length > 0) {
        return item.title.toLowerCase().includes(queryLower) ||
               item.category.toLowerCase().includes(queryLower) ||
               item.infoHash.toLowerCase().includes(queryLower);
      }

      return true;
    });

    // 2. Sorting
    items.sort((a, b) => {
      if (state.sortBy === 'ranking') {
        return state.sortDirection === 'desc'
          ? (b.rankingSignals?.score || 0) - (a.rankingSignals?.score || 0)
          : (a.rankingSignals?.score || 0) - (b.rankingSignals?.score || 0);
      }
      if (state.sortBy === 'seeders') {
        return state.sortDirection === 'desc' ? (b.seeders || 0) - (a.seeders || 0) : (a.seeders || 0) - (b.seeders || 0);
      }
      if (state.sortBy === 'size') {
        return state.sortDirection === 'desc' ? (b.sizeBytes || 0) - (a.sizeBytes || 0) : (a.sizeBytes || 0) - (b.sizeBytes || 0);
      }
      if (state.sortBy === 'freshness') {
        return state.sortDirection === 'desc'
          ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      }
      return 0;
    });

    // 3. Clear Table
    el.resultsBody.replaceChildren();

    if (items.length === 0) {
      const emptyRow = document.createElement('tr');
      const emptyCell = document.createElement('td');
      emptyCell.colSpan = 7;
      emptyCell.style.padding = '3rem 1rem';
      emptyCell.style.textAlign = 'center';
      emptyCell.style.color = 'var(--color-text-muted)';

      const title = document.createElement('strong');
      title.style.display = 'block';
      title.style.marginBottom = '0.5rem';
      title.textContent = 'NO MATCHING RESULTS FOUND';

      const desc = document.createElement('span');
      desc.textContent = 'Try adjusting your search query or enabling inactive provider feeds above.';

      emptyCell.append(title, desc);
      emptyRow.appendChild(emptyCell);
      el.resultsBody.appendChild(emptyRow);
      el.resultCount.textContent = '0 items';
      return;
    }

    // 4. Populate rows with safe textContent (zero innerHTML)
    items.forEach(item => {
      const tr = document.createElement('tr');
      tr.className = 'data-row';
      if (state.selectedItemId === item.id) {
        tr.classList.add('is-selected');
      }

      // Title & Info
      const tdTitle = document.createElement('td');
      tdTitle.className = 'item-title-col';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'item-title-link';
      titleSpan.textContent = item.title;

      const metaSub = document.createElement('div');
      metaSub.className = 'item-meta-row';

      const hashBadge = document.createElement('span');
      hashBadge.className = 'badge';
      hashBadge.textContent = 'hash:' + item.infoHash.substring(0, 8) + '…';

      const srcBadge = document.createElement('span');
      srcBadge.className = 'badge badge-accent';
      srcBadge.textContent = item.sourceId;

      metaSub.append(hashBadge, srcBadge);
      tdTitle.append(titleSpan, metaSub);

      // Category
      const tdCategory = document.createElement('td');
      const catBadge = document.createElement('span');
      catBadge.className = 'badge';
      catBadge.textContent = item.category;
      tdCategory.appendChild(catBadge);

      // Size
      const tdSize = document.createElement('td');
      tdSize.style.fontFamily = 'var(--font-mono)';
      tdSize.style.fontSize = '0.8125rem';
      tdSize.textContent = formatBytes(item.sizeBytes);

      // Swarm / Availability
      const tdSwarm = document.createElement('td');
      tdSwarm.style.fontFamily = 'var(--font-mono)';
      tdSwarm.style.fontSize = '0.8125rem';
      const swarmText = document.createElement('span');
      swarmText.style.color = 'var(--color-text-accent)';
      swarmText.textContent = `▲${item.seeders || 0} `;
      const leechText = document.createElement('span');
      leechText.style.color = 'var(--color-text-muted)';
      leechText.textContent = `▼${item.leechers || 0}`;
      tdSwarm.append(swarmText, leechText);

      // Health Indicator
      const tdHealth = document.createElement('td');
      const health = getHealthCategory(item.seeders, item.leechers);
      const healthPill = document.createElement('span');
      healthPill.className = `badge ${health.className}`;
      healthPill.textContent = health.score;
      tdHealth.appendChild(healthPill);

      // Published Age
      const tdDate = document.createElement('td');
      tdDate.style.fontFamily = 'var(--font-mono)';
      tdDate.style.fontSize = '0.75rem';
      tdDate.style.color = 'var(--color-text-muted)';
      tdDate.textContent = formatDate(item.publishedAt);

      // Action Buttons
      const tdActions = document.createElement('td');
      tdActions.style.textAlign = 'right';
      const actionsWrapper = document.createElement('div');
      actionsWrapper.style.display = 'inline-flex';
      actionsWrapper.style.gap = '0.35rem';

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'button button--primary button--sm';
      copyBtn.textContent = 'Magnet';
      copyBtn.title = 'Copy Verified Magnet Link';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (item.magnetUri) {
          navigator.clipboard?.writeText(item.magnetUri).catch(() => {});
          showToast('✓ Magnet link copied to clipboard!');
        }
      });

      const inspectBtn = document.createElement('button');
      inspectBtn.type = 'button';
      inspectBtn.className = 'button button--sm';
      inspectBtn.textContent = 'Inspect';
      inspectBtn.title = 'Inspect Metadata & Ranking Signals';
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openItemInspector(item);
      });

      actionsWrapper.append(copyBtn, inspectBtn);
      tdActions.appendChild(actionsWrapper);

      tr.addEventListener('click', () => {
        state.selectedItemId = item.id;
        filterAndRenderResults();
      });

      tr.append(tdTitle, tdCategory, tdSize, tdSwarm, tdHealth, tdDate, tdActions);
      el.resultsBody.appendChild(tr);
    });

    const elapsed = (performance.now() - startTime).toFixed(1);
    el.resultCount.textContent = `${items.length} items`;
    el.searchLatency.textContent = `${elapsed} ms`;
  }

  // --- Open Item Inspector Modal ---
  function openItemInspector(item) {
    el.modalTitle.textContent = `Metadata Inspector // ${item.id}`;
    el.modalBody.replaceChildren();

    const parsed = parseMagnetSafe(item.magnetUri);

    const sec1 = document.createElement('div');
    const h1 = document.createElement('strong');
    h1.style.fontFamily = 'var(--font-mono)';
    h1.style.fontSize = '0.75rem';
    h1.style.textTransform = 'uppercase';
    h1.style.letterSpacing = '0.04em';
    h1.textContent = 'CANONICAL METADATA';
    const titleP = document.createElement('p');
    titleP.style.marginTop = '0.25rem';
    titleP.textContent = `Title: ${item.title}`;
    const srcP = document.createElement('p');
    srcP.style.color = 'var(--color-text-muted)';
    srcP.textContent = `Source Provider: ${item.sourceId} | Category: ${item.category}`;
    sec1.append(h1, titleP, srcP);

    const sec2 = document.createElement('div');
    const h2 = document.createElement('strong');
    h2.style.fontFamily = 'var(--font-mono)';
    h2.style.fontSize = '0.75rem';
    h2.style.textTransform = 'uppercase';
    h2.style.letterSpacing = '0.04em';
    h2.textContent = 'MAGNET SECURITY PARSER (AATP-0505)';
    const statusBadge = document.createElement('span');
    statusBadge.className = parsed.valid ? 'badge badge-accent' : 'badge badge-cherry';
    statusBadge.style.marginLeft = '0.5rem';
    statusBadge.textContent = parsed.valid ? '✓ VALIDATED RFC BTIH' : `× REJECTED: ${parsed.error}`;

    const magnetBox = document.createElement('div');
    magnetBox.className = 'code-box';
    magnetBox.style.marginTop = '0.5rem';
    magnetBox.textContent = `InfoHash : ${parsed.infoHash || 'N/A'}\nTrackers : ${(parsed.trackers || []).length} registered\nRaw URI  : ${item.magnetUri}`;

    sec2.append(h2, statusBadge, magnetBox);

    const sec3 = document.createElement('div');
    const h3 = document.createElement('strong');
    h3.style.fontFamily = 'var(--font-mono)';
    h3.style.fontSize = '0.75rem';
    h3.style.textTransform = 'uppercase';
    h3.style.letterSpacing = '0.04em';
    h3.textContent = 'DETERMINISTIC RANKING SIGNALS (AATP-0306 / 0307)';

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(130px, 1fr))';
    grid.style.gap = '0.5rem';
    grid.style.marginTop = '0.5rem';

    const signals = [
      { label: 'Overall Score', value: `${item.rankingSignals?.score || 0} / 100` },
      { label: 'Availability', value: `${Math.round((item.rankingSignals?.availability || 0) * 100)}%` },
      { label: 'Freshness', value: `${Math.round((item.rankingSignals?.freshness || 0) * 100)}%` },
      { label: 'Metadata Quality', value: `${Math.round((item.rankingSignals?.metadataCompleteness || 0) * 100)}%` },
      { label: 'Provider Conf.', value: `${Math.round((item.rankingSignals?.providerConfidence || 0) * 100)}%` }
    ];

    signals.forEach(s => {
      const card = document.createElement('div');
      card.style.background = 'var(--color-bg-canvas)';
      card.style.border = 'var(--border-default)';
      card.style.padding = '0.5rem';
      card.style.borderRadius = 'var(--radius-xs)';

      const lbl = document.createElement('div');
      lbl.style.fontSize = '0.6875rem';
      lbl.style.color = 'var(--color-text-muted)';
      lbl.textContent = s.label;

      const val = document.createElement('div');
      val.style.fontFamily = 'var(--font-mono)';
      val.style.fontSize = '0.875rem';
      val.style.fontWeight = '600';
      val.style.color = 'var(--color-text-accent)';
      val.textContent = s.value;

      card.append(lbl, val);
      grid.appendChild(card);
    });

    sec3.append(h3, grid);

    el.modalBody.append(sec1, sec2, sec3);
    el.modalBackdrop.classList.remove('is-hidden');
  }

  // --- Open Settings Modal ---
  function openSettingsModal() {
    el.modalTitle.textContent = 'Settings & Privacy Controls';
    el.modalBody.replaceChildren();

    const secPrivacy = document.createElement('div');
    const hPrivacy = document.createElement('strong');
    hPrivacy.style.fontFamily = 'var(--font-mono)';
    hPrivacy.style.fontSize = '0.75rem';
    hPrivacy.textContent = 'PRIVACY CONTROLS (PHASE 4)';

    const desc = document.createElement('p');
    desc.style.marginTop = '0.25rem';
    desc.style.color = 'var(--color-text-muted)';
    desc.textContent = 'In accordance with INV-08, no passwords or private RPC tokens are ever stored.';

    const histBtnGroup = document.createElement('div');
    histBtnGroup.style.display = 'flex';
    histBtnGroup.style.gap = '0.5rem';
    histBtnGroup.style.marginTop = '0.75rem';

    const clearHistBtn = document.createElement('button');
    clearHistBtn.type = 'button';
    clearHistBtn.className = 'button button--sm';
    clearHistBtn.textContent = 'Clear Search History';
    clearHistBtn.addEventListener('click', () => {
      state.searchHistory = [];
      showToast('✓ Search history cleared.');
    });

    const clearCacheBtn = document.createElement('button');
    clearCacheBtn.type = 'button';
    clearCacheBtn.className = 'button button--sm';
    clearCacheBtn.textContent = 'Clear Cache';
    clearCacheBtn.addEventListener('click', () => {
      showToast('✓ Metadata cache purged.');
    });

    histBtnGroup.append(clearHistBtn, clearCacheBtn);
    secPrivacy.append(hPrivacy, desc, histBtnGroup);

    el.modalBody.append(secPrivacy);
    el.modalBackdrop.classList.remove('is-hidden');
  }

  function closeModal() {
    el.modalBackdrop.classList.add('is-hidden');
  }

  function initToggles() {
    el.themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      el.themeToggleBtn.textContent = state.theme === 'dark' ? 'Theme: Dark' : 'Theme: Light';
    });

    el.densityToggleBtn.addEventListener('click', () => {
      state.density = state.density === 'comfortable' ? 'compact' : 'comfortable';
      document.documentElement.setAttribute('data-density', state.density);
      el.densityToggleBtn.textContent = state.density === 'comfortable' ? 'Compact' : 'Comfortable';
    });

    el.modalCloseBtn.addEventListener('click', closeModal);
    el.modalActionBtn.addEventListener('click', closeModal);
    el.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === el.modalBackdrop) closeModal();
    });

    el.settingsBtn.addEventListener('click', openSettingsModal);

    el.searchInput.addEventListener('input', (e) => {
      state.query = e.target.value;
      filterAndRenderResults();
    });

    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.selectedCategory = btn.getAttribute('data-category') || 'ALL';
        filterAndRenderResults();
      });
    });

    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const sortKey = th.getAttribute('data-sort');
        if (state.sortBy === sortKey) {
          state.sortDirection = state.sortDirection === 'desc' ? 'asc' : 'desc';
        } else {
          state.sortBy = sortKey;
          state.sortDirection = 'desc';
        }
        filterAndRenderResults();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== el.searchInput) {
        e.preventDefault();
        el.searchInput.focus();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  function init() {
    renderProviders();
    initToggles();
    filterAndRenderResults();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
