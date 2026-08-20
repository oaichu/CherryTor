/**
 * Safe DOM TextContent Renderer for CherryTor
 * In accordance with AATP-0501, AATP-0502, INV-04, INV-05
 */

import type { SearchItem } from '../../../../packages/schemas/src/item.ts';

export function createSafeTextSpan(text: string, className?: string): HTMLSpanElement {
  const span = document.createElement('span');
  if (className) span.className = className;
  span.textContent = text; // Safe text assignment: zero HTML interpretation
  return span;
}

export function createSafeBadge(text: string, type: 'accent' | 'success' | 'warning' | 'danger' | 'info' = 'accent'): HTMLSpanElement {
  const badge = document.createElement('span');
  badge.className = `badge badge-${type}`;
  badge.textContent = text;
  return badge;
}

export function renderSafeResultRow(
  item: SearchItem,
  isSelected: boolean,
  onCopyMagnet: (item: SearchItem) => void,
  onInspect: (item: SearchItem) => void
): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.className = isSelected ? 'result-row selected' : 'result-row';

  // 1. Title cell
  const tdTitle = document.createElement('td');
  tdTitle.className = 'result-title-cell';
  const titleText = createSafeTextSpan(item.title, 'result-title-text');
  
  const metaSub = document.createElement('div');
  metaSub.className = 'result-meta-sub';
  const hashBadge = createSafeBadge(`HASH: ${item.infoHash.substring(0, 10)}…`);
  const srcBadge = createSafeBadge(item.sourceId, 'accent');
  metaSub.append(hashBadge, srcBadge);
  tdTitle.append(titleText, metaSub);

  // 2. Category
  const tdCategory = document.createElement('td');
  tdCategory.appendChild(createSafeBadge(item.category));

  // 3. Size
  const tdSize = document.createElement('td');
  const sizeFormatted = item.sizeBytes ? `${(item.sizeBytes / (1024 * 1024 * 1024)).toFixed(2)} GiB` : 'N/A';
  tdSize.textContent = sizeFormatted;

  // 4. Swarm (Seeders / Leechers)
  const tdSwarm = document.createElement('td');
  const seedSpan = createSafeTextSpan(`▲ ${item.seeders ?? 0} `);
  seedSpan.style.color = 'var(--color-text-accent)';
  const leechSpan = createSafeTextSpan(`▼ ${item.leechers ?? 0}`);
  leechSpan.style.color = 'var(--color-text-muted)';
  tdSwarm.append(seedSpan, leechSpan);

  // 5. Health Indicator
  const tdHealth = document.createElement('td');
  const seeders = item.seeders ?? 0;
  let healthClass = 'health-low';
  let healthText = '● Low';
  if (seeders >= 1000) {
    healthClass = 'health-high';
    healthText = '● High';
  } else if (seeders >= 100) {
    healthClass = 'health-medium';
    healthText = '● Moderate';
  }
  const healthPill = createSafeTextSpan(healthText, `health-pill ${healthClass}`);
  tdHealth.appendChild(healthPill);

  // 6. Actions
  const tdActions = document.createElement('td');
  const actionWrapper = document.createElement('div');
  actionWrapper.className = 'row-actions';

  const magnetBtn = document.createElement('button');
  magnetBtn.type = 'button';
  magnetBtn.className = 'btn btn-sm btn-primary';
  magnetBtn.textContent = 'MAGNET';
  magnetBtn.onclick = (e) => {
    e.stopPropagation();
    onCopyMagnet(item);
  };

  const inspectBtn = document.createElement('button');
  inspectBtn.type = 'button';
  inspectBtn.className = 'btn btn-sm';
  inspectBtn.textContent = 'INSPECT';
  inspectBtn.onclick = (e) => {
    e.stopPropagation();
    onInspect(item);
  };

  actionWrapper.append(magnetBtn, inspectBtn);
  tdActions.appendChild(actionWrapper);

  tr.append(tdTitle, tdCategory, tdSize, tdSwarm, tdHealth, tdActions);
  return tr;
}
