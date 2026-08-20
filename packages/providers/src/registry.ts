import type { ProviderEndpointConfig } from './types.ts';

const APPROVED_PROVIDERS: ReadonlyMap<string, ProviderEndpointConfig> = new Map([
  [
    'canonical-releases',
    {
      id: 'canonical-releases',
      name: 'Ubuntu / Canonical Releases',
      origin: 'https://torrent.ubuntu.com',
      pathTemplate: '/api/v1/search?q={query}',
      allowedRedirectHosts: ['torrent.ubuntu.com', 'releases.ubuntu.com'],
      timeoutMs: 4000,
      maxPayloadBytes: 2097152, // 2MB
      requiresAuth: false,
      format: 'json',
      enabled: true
    }
  ],
  [
    'arch-mirror',
    {
      id: 'arch-mirror',
      name: 'Arch Linux Mirror Feeds',
      origin: 'https://geo.mirror.pkgbuild.com',
      pathTemplate: '/iso/latest/query?q={query}',
      allowedRedirectHosts: ['geo.mirror.pkgbuild.com', 'mirror.rackspace.com'],
      timeoutMs: 4500,
      maxPayloadBytes: 2097152,
      requiresAuth: false,
      format: 'json',
      enabled: true
    }
  ],
  [
    'blender-foundation',
    {
      id: 'blender-foundation',
      name: 'Blender Open Media Assets',
      origin: 'https://download.blender.org',
      pathTemplate: '/torrents/feed.json?q={query}',
      allowedRedirectHosts: ['download.blender.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 2097152,
      requiresAuth: false,
      format: 'json',
      enabled: true
    }
  ],
  [
    'godot-community',
    {
      id: 'godot-community',
      name: 'Godot Engine Open Source Feeds',
      origin: 'https://downloads.tuxfamily.org',
      pathTemplate: '/godotengine/torrents.json?q={query}',
      allowedRedirectHosts: ['downloads.tuxfamily.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 2097152,
      requiresAuth: false,
      format: 'json',
      enabled: true
    }
  ],
  [
    'debian-cd',
    {
      id: 'debian-cd',
      name: 'Debian CD Image Archive',
      origin: 'https://cdimage.debian.org',
      pathTemplate: '/cdimage/release/current/torrents.json?q={query}',
      allowedRedirectHosts: ['cdimage.debian.org'],
      timeoutMs: 5000,
      maxPayloadBytes: 2097152,
      requiresAuth: false,
      format: 'json',
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
      maxPayloadBytes: 2097152,
      requiresAuth: false,
      format: 'json',
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
      maxPayloadBytes: 2097152,
      requiresAuth: false,
      format: 'xml',
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
