/**
 * Provider Types & Registry Definitions for CherryTor Edge Gateway
 * In accordance with AATP-0201 & INV-03
 */

export interface ProviderEndpointConfig {
  readonly id: string;
  readonly name: string;
  readonly origin: string; // Must be strictly https://
  readonly pathTemplate: string; // e.g. "/api/search?q={query}"
  readonly allowedRedirectHosts: readonly string[];
  readonly timeoutMs: number; // default <= 5000
  readonly maxPayloadBytes: number; // default <= 2097152 (2MB)
  readonly requiresAuth: boolean;
  readonly format: 'json' | 'xml';
  readonly enabled: boolean;
}
