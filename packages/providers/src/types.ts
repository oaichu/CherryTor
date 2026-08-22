/**
 * Provider Types & Registry Definitions for CherryTor Edge Gateway
 * In accordance with AATP-0201, INV-03 & Phase 13
 */

export type ProviderAdapterType =
  | 'generic'
  | 'apibay'
  | 'archive-org'
  | 'rss-xml'
  | 'yts'
  | 'eztv'
  | 'solidtorrents';

export interface ProviderEndpointConfig {
  readonly id: string;
  readonly name: string;
  readonly origin: string; // Must be strictly https://
  readonly mirrors?: readonly string[]; // Fallback & alternative mirror origins
  readonly pathTemplate: string; // e.g. "/api/search?q={query}"
  readonly allowedRedirectHosts: readonly string[];
  readonly timeoutMs: number; // default <= 5000
  readonly maxPayloadBytes: number; // default <= 5242880 (5MB)
  readonly requiresAuth: boolean;
  readonly format: 'json' | 'xml';
  readonly adapter?: ProviderAdapterType;
  readonly enabled: boolean;
  /**
   * True when the upstream ignores its search parameter and returns its latest
   * uploads regardless of query (e.g. EZTV keywords, LinuxTracker rss search).
   * The edge applies a server-side relevance filter to such feeds (AATP-S1).
   */
  readonly unfilteredSearch?: boolean;
  /**
   * Optional upstream-side category narrowing: canonical CherryTor category →
   * upstream query-parameter value (AATP-S4). Only verified parent codes are
   * mapped (apibay accepts 100/200/300/400; subcategory codes are ignored by it).
   */
  readonly categoryParam?: {
    readonly param: string;
    readonly map: Readonly<Record<string, string>>;
  };
}
