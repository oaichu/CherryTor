/**
 * Canonical SearchItem & Metadata Types for CherryTor
 * In accordance with AATP-0103
 */

export type Category =
  | 'Software'
  | 'Movies'
  | 'TV'
  | 'Anime'
  | 'Music'
  | 'Games'
  | 'Books'
  | 'Other';

export interface RankingSignals {
  readonly availability: number; // 0.0 - 1.0
  readonly freshness: number; // 0.0 - 1.0
  readonly metadataCompleteness: number; // 0.0 - 1.0
  readonly providerConfidence: number; // 0.0 - 1.0
  readonly score: number; // 0.0 - 100.0
}

export interface SearchItem {
  readonly id: string;
  readonly title: string;
  readonly category: Category;
  readonly sizeBytes: number | null;
  readonly seeders: number | null;
  readonly leechers: number | null;
  readonly infoHash: string; // 40-hex or 32-base32
  readonly magnetUri?: string;
  readonly sourceId: string;
  readonly publishedAt?: string; // ISO-8601
  readonly rankingSignals?: RankingSignals;
}

export interface ProviderSearchQuery {
  readonly provider: string;
  readonly query: string;
  readonly category?: Category | 'ALL';
}

export interface GatewayResponseMeta {
  readonly provider: string;
  readonly latencyMs: number;
  readonly timestamp: string;
}

export interface NormalizedGatewayResponse {
  readonly data: readonly SearchItem[];
  readonly errors: readonly string[];
  readonly meta: GatewayResponseMeta;
}
