import type { ProviderEndpointConfig } from './types.ts';

const APPROVED_PROVIDERS: ReadonlyMap<string, ProviderEndpointConfig> = new Map([
  [
    'apibay',
    {
      id: 'apibay',
      name: 'ThePirateBay / Apibay Index',
      origin: 'https://apibay.org',
      pathTemplate: '/q.php?q={query}',
      allowedRedirectHosts: ['apibay.org', 'thepiratebay.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880, // 5MB
      requiresAuth: false,
      format: 'json',
      adapter: 'apibay',
      enabled: true
    }
  ],
  [
    'nyaa',
    {
      id: 'nyaa',
      name: 'Nyaa Asian & Global Media',
      origin: 'https://nyaa.si',
      pathTemplate: '/?page=rss&q={query}',
      allowedRedirectHosts: ['nyaa.si', 'sukebei.nyaa.si'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],
  [
    'dmhy',
    {
      id: 'dmhy',
      name: '动漫花园 DMHY (Chinese ACG)',
      origin: 'https://share.dmhy.org',
      pathTemplate: '/topics/rss/rss.xml?keyword={query}',
      allowedRedirectHosts: ['share.dmhy.org', 'dmhy.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],
  [
    'acg-rip',
    {
      id: 'acg-rip',
      name: 'ACG.RIP (Chinese Community)',
      origin: 'https://acg.rip',
      pathTemplate: '/1.xml?term={query}',
      allowedRedirectHosts: ['acg.rip'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],
  [
    'archive-org',
    {
      id: 'archive-org',
      name: 'Internet Archive Public Media',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+format:Torrent&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      enabled: true
    }
  ],
  [
    'linuxtracker',
    {
      id: 'linuxtracker',
      name: 'LinuxTracker Distro Feeds',
      origin: 'https://linuxtracker.org',
      pathTemplate: '/rss.php?search={query}',
      allowedRedirectHosts: ['linuxtracker.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ]
]);

export function getProviderConfig(providerId: string): ProviderEndpointConfig | null {
  if (typeof providerId !== 'string') return null;
  const config = APPROVED_PROVIDERS.get(providerId.trim());
  if (!config || !config.enabled) {
    return null;
  }
  return config;
}

export function listApprovedProviders(): readonly ProviderEndpointConfig[] {
  return Array.from(APPROVED_PROVIDERS.values()).filter(p => p.enabled);
}

export function isApprovedProvider(providerId: string): boolean {
  return getProviderConfig(providerId) !== null;
}
