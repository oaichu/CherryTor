import type { ProviderEndpointConfig } from './types.ts';

const APPROVED_PROVIDERS: ReadonlyMap<string, ProviderEndpointConfig> = new Map([
  // 1. Phim & Phim Châu Á (Asian & Global Movies / Dramas)
  [
    'apibay',
    {
      id: 'apibay',
      name: 'ThePirateBay (Global)',
      origin: 'https://apibay.org',
      mirrors: ['https://apibay.org', 'https://thepiratebay.org', 'https://tpb.party'],
      pathTemplate: '/q.php?q={query}',
      allowedRedirectHosts: ['apibay.org', 'thepiratebay.org', 'tpb.party'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'apibay',
      // TPB search is latin-substring based; CJK queries fall back to latest uploads
      // (live probe: 鬼滅 returned unrelated items) — edge relevance-filters (AATP-S1)
      unfilteredSearch: true,
      // AATP-S4: upstream category narrowing — only parent codes verified live
      // (100 Audio / 200 Video / 300 Apps / 400 Games; subcategory codes are ignored)
      categoryParam: {
        param: 'cat',
        map: { Movies: '200', TV: '200', Anime: '200', Music: '100', Games: '400', Software: '300' }
      },
      enabled: true
    }
  ],
  [
    'dmhy',
    {
      id: 'dmhy',
      name: '动漫花园 DMHY (中文 / 亚洲影视)',
      origin: 'https://share.dmhy.org',
      mirrors: ['https://share.dmhy.org', 'https://dmhy.org', 'https://dmhy.anoneko.com'],
      pathTemplate: '/topics/rss/rss.xml?keyword={query}',
      allowedRedirectHosts: ['share.dmhy.org', 'dmhy.org', 'dmhy.anoneko.com'],
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
      mirrors: ['https://nyaa.si', 'https://nyaa.land', 'https://nyaa.ink', 'https://nyaa.net'],
      pathTemplate: '/?page=rss&q={query}',
      allowedRedirectHosts: ['nyaa.si', 'sukebei.nyaa.si', 'nyaa.land', 'nyaa.ink', 'nyaa.net'],
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
      mirrors: ['https://acg.rip'],
      pathTemplate: '/1.xml?term={query}',
      allowedRedirectHosts: ['acg.rip'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      // AATP-S3: feed carries no extractable infoHash (0 items on latin + CJK probes)
      enabled: false
    }
  ],
  [
    'bangumi',
    {
      id: 'bangumi',
      name: '萌番组 Bangumi (亚洲动画/剧集)',
      origin: 'https://bangumi.moe',
      mirrors: ['https://bangumi.moe', 'https://bangumi.online'],
      pathTemplate: '/rss/latest?search={query}',
      allowedRedirectHosts: ['bangumi.moe', 'bangumi.online'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'xml',
      adapter: 'rss-xml',
      // AATP-S3: latest-feed carries no extractable infoHash (0 items on both probes)
      enabled: false
    }
  ],
  [
    'tokyotosho',
    {
      id: 'tokyotosho',
      name: 'Tokyo Toshokan (Asian Media)',
      origin: 'https://www.tokyotosho.info',
      mirrors: ['https://www.tokyotosho.info', 'https://tokyotosho.info'],
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
      mirrors: ['https://yts.mx', 'https://yts.lt', 'https://yts.do', 'https://yts.ag'],
      pathTemplate: '/api/v2/list_movies.json?query_term={query}&limit=25',
      allowedRedirectHosts: ['yts.mx', 'yts.lt', 'yts.am', 'yts.do', 'yts.ag', 'yts.gg'],
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
      mirrors: ['https://eztv.re', 'https://eztv.it', 'https://eztv.ch', 'https://eztv.wf'],
      pathTemplate: '/api/get-torrents?keywords={query}&limit=30',
      allowedRedirectHosts: ['eztv.re', 'eztv.it', 'eztv.ch', 'eztv.wf'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'eztv',
      // EZTV's API ignores the keywords param (returns latest uploads) — edge filters (AATP-S1)
      unfilteredSearch: true,
      enabled: true
    }
  ],
  [
    'solidtorrents',
    {
      id: 'solidtorrents',
      name: 'SolidTorrents (DHT Search)',
      origin: 'https://solidtorrents.to',
      mirrors: ['https://solidtorrents.to', 'https://solidtorrents.net', 'https://bitsearch.to'],
      pathTemplate: '/api/v1/search?q={query}&limit=30',
      allowedRedirectHosts: ['solidtorrents.to', 'solidtorrents.net', 'bitsearch.to', 'bitsearch.eu'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'solidtorrents',
      enabled: true
    }
  ],
  [
    'bitsearch',
    {
      // AATP-S2: open DHT search API (SolidTorrents-compatible shape), verified live
      // 200/application/json — no browser emulation, no WAF bypass (INV-06 compliant).
      id: 'bitsearch',
      name: 'BitSearch (DHT Search)',
      origin: 'https://bitsearch.eu',
      mirrors: ['https://bitsearch.eu', 'https://bitsearch.to'],
      pathTemplate: '/api/v1/search?q={query}',
      allowedRedirectHosts: ['bitsearch.eu', 'bitsearch.to'],
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
      // rss.php ignores the search param (returns latest uploads) — edge filters (AATP-S1)
      unfilteredSearch: true,
      enabled: true
    }
  ],
  [
    'archive-org-software',
    {
      id: 'archive-org-software',
      name: 'Archive.org Software (ISOs/Tools)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+mediatype:software&fl[]=identifier,title,item_size,publicdate,downloads,mediatype&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      // AATP-R003 (FIND-002): this adapter fabricates infoHashes (identifier padding),
      // producing dead magnets displayed as verified. Keep disabled until a real-hash
      // adapter (archive.org metadata API) passes the provider security gate.
      enabled: false
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
      // AATP-S3: TLS-fails from worker egress AND WordPress RSS carries no magnets
      // (0 items on both probes) — disabled until a hash-bearing endpoint exists
      enabled: false
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
      // AATP-S3: WordPress RSS carries no magnets (0 items on both probes)
      enabled: false
    }
  ],

  // 4. Sách & Tài liệu (Books & Texts)
  [
    'archive-org-texts',
    {
      id: 'archive-org-texts',
      name: 'Archive.org Texts (Books & Ebooks)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+mediatype:texts&fl[]=identifier,title,item_size,publicdate,downloads,mediatype&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      // AATP-R003 (FIND-002): this adapter fabricates infoHashes (identifier padding),
      // producing dead magnets displayed as verified. Keep disabled until a real-hash
      // adapter (archive.org metadata API) passes the provider security gate.
      enabled: false
    }
  ],

  // 5. Âm nhạc & Lossless Audio (Music & Hi-Res)
  [
    'archive-org-audio',
    {
      id: 'archive-org-audio',
      name: 'Archive.org Audio (FLAC / Hi-Res)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+mediatype:audio&fl[]=identifier,title,item_size,publicdate,downloads,mediatype&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      // AATP-R003 (FIND-002): this adapter fabricates infoHashes (identifier padding),
      // producing dead magnets displayed as verified. Keep disabled until a real-hash
      // adapter (archive.org metadata API) passes the provider security gate.
      enabled: false
    }
  ],
  [
    'archive-org',
    {
      id: 'archive-org',
      name: 'Internet Archive (General)',
      origin: 'https://archive.org',
      pathTemplate: '/advancedsearch.php?q={query}+AND+format:Torrent&fl[]=identifier,title,item_size,publicdate,downloads,mediatype&output=json',
      allowedRedirectHosts: ['archive.org', 'ia800000.us.archive.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 5242880,
      requiresAuth: false,
      format: 'json',
      adapter: 'archive-org',
      // AATP-R003 (FIND-002): this adapter fabricates infoHashes (identifier padding),
      // producing dead magnets displayed as verified. Keep disabled until a real-hash
      // adapter (archive.org metadata API) passes the provider security gate.
      enabled: false
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
