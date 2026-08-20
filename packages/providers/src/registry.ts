import type { ProviderEndpointConfig } from './types.ts';

const APPROVED_PROVIDERS: ReadonlyMap<string, ProviderEndpointConfig> = new Map([
  // 1. Phim & Phim Châu Á (Asian & Global Movies / Dramas)
  [
    'apibay',
    {
      id: 'apibay',
      name: 'ThePirateBay (Global)',
      origin: 'https://apibay.org',
      pathTemplate: '/q.php?q={query}',
      allowedRedirectHosts: ['apibay.org', 'thepiratebay.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'apibay',
      enabled: true
    }
  ],
  [
    'dmhy',
    {
      id: 'dmhy',
      name: '动漫花园 DMHY (中文 / 亚洲影视)',
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
    'nyaa',
    {
      id: 'nyaa',
      name: 'Nyaa (Asian & Global Media)',
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
    'acg-rip',
    {
      id: 'acg-rip',
      name: 'ACG.RIP (中文影视社区)',
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
    'bangumi',
    {
      id: 'bangumi',
      name: '萌番组 Bangumi (亚洲动画/剧集)',
      origin: 'https://bangumi.moe',
      pathTemplate: '/rss/latest?search={query}',
      allowedRedirectHosts: ['bangumi.moe'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],
  [
    'tokyotosho',
    {
      id: 'tokyotosho',
      name: 'Tokyo Toshokan (Asian Media)',
      origin: 'https://www.tokyotosho.info',
      pathTemplate: '/rss.php?terms={query}',
      allowedRedirectHosts: ['tokyotosho.info', 'www.tokyotosho.info'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],
  [
    'yts',
    {
      id: 'yts',
      name: 'YTS (Movies HD/4K)',
      origin: 'https://yts.mx',
      pathTemplate: '/api/v2/list_movies.json?query_term={query}&limit=25',
      allowedRedirectHosts: ['yts.mx', 'yts.lt', 'yts.am'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'yts',
      enabled: true
    }
  ],
  [
    'eztv',
    {
      id: 'eztv',
      name: 'EZTV (TV Series & Shows)',
      origin: 'https://eztv.re',
      pathTemplate: '/api/get-torrents?keywords={query}&limit=30',
      allowedRedirectHosts: ['eztv.re', 'eztv.it', 'eztv.ch'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'eztv',
      enabled: true
    }
  ],
  [
    'solidtorrents',
    {
      id: 'solidtorrents',
      name: 'SolidTorrents (DHT Search)',
      origin: 'https://solidtorrents.to',
      pathTemplate: '/api/v1/search?q={query}&limit=30',
      allowedRedirectHosts: ['solidtorrents.to', 'solidtorrents.net'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'solidtorrents',
      enabled: true
    }
  ],

  // 2. Phần mềm & Hệ điều hành (Software & OS)
  [
    'linuxtracker',
    {
      id: 'linuxtracker',
      name: 'LinuxTracker (Linux & OSS)',
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
  ],
  [
    'archive-org-software',
    {
      id: 'archive-org-software',
      name: 'Archive.org Software (ISOs/Tools)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+mediatype:software&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      enabled: true
    }
  ],

  // 3. Trò chơi (Games - PC / Repacks)
  [
    'fitgirl',
    {
      id: 'fitgirl',
      name: 'FitGirl Repacks (PC Games)',
      origin: 'https://fitgirl-repacks.site',
      pathTemplate: '/feed/?s={query}',
      allowedRedirectHosts: ['fitgirl-repacks.site'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],
  [
    'dodi',
    {
      id: 'dodi',
      name: 'DODI Repacks (PC Games)',
      origin: 'https://dodi-repacks.site',
      pathTemplate: '/feed/?s={query}',
      allowedRedirectHosts: ['dodi-repacks.site'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      enabled: true
    }
  ],

  // 4. Sách & Tài liệu (Books & Texts)
  [
    'archive-org-texts',
    {
      id: 'archive-org-texts',
      name: 'Archive.org Texts (Books & Ebooks)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+mediatype:texts&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      enabled: true
    }
  ],

  // 5. Âm nhạc & Lossless Audio (Music & Hi-Res)
  [
    'archive-org-audio',
    {
      id: 'archive-org-audio',
      name: 'Archive.org Audio (FLAC / Hi-Res)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+mediatype:audio&output=json',
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
    'archive-org',
    {
      id: 'archive-org',
      name: 'Internet Archive (General)',
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
