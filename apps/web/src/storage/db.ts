/**
 * Client Storage Layer (IndexedDB with memory fallback for test environments)
 * In accordance with AATP-0401, AATP-0404, AATP-0405, INV-08
 */

import type { SearchItem } from '../../../../packages/schemas/src/item.ts';

export interface CachedSearchEntry {
  readonly cacheKey: string;
  readonly query: string;
  readonly providerSet: readonly string[];
  readonly schemaVersion: number;
  readonly createdAt: number;
  readonly expiresAt: number; // TTL bound (default: 30 minutes)
  readonly data: readonly SearchItem[];
}

export interface SearchHistoryEntry {
  readonly id: string;
  readonly query: string;
  readonly timestamp: number;
}

export interface UserSettings {
  readonly theme: 'terminal-dark' | 'terminal-light';
  readonly density: 'comfortable' | 'compact';
  readonly crtMode: 'full' | 'reduced' | 'off';
  readonly historyEnabled: boolean;
}

export const CURRENT_SCHEMA_VERSION = 1;
export const DEFAULT_CACHE_TTL_MS = 30 * 60 * 1000; // 30 mins

export class StorageEngine {
  private cacheStore = new Map<string, CachedSearchEntry>();
  private historyStore: SearchHistoryEntry[] = [];
  private settingsStore: UserSettings = {
    theme: 'terminal-dark',
    density: 'comfortable',
    crtMode: 'reduced',
    historyEnabled: true
  };

  public generateCacheKey(query: string, providers: readonly string[]): string {
    const sortedProviders = [...providers].sort().join(',');
    return `${query.toLowerCase().trim()}:${sortedProviders}:${CURRENT_SCHEMA_VERSION}`;
  }

  // --- Cache Methods ---
  public setCachedResults(
    query: string,
    providers: readonly string[],
    data: readonly SearchItem[],
    ttlMs: number = DEFAULT_CACHE_TTL_MS
  ): void {
    const now = Date.now();
    const cacheKey = this.generateCacheKey(query, providers);
    this.cacheStore.set(cacheKey, {
      cacheKey,
      query,
      providerSet: providers,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      createdAt: now,
      expiresAt: now + ttlMs,
      data
    });
  }

  public getCachedResults(query: string, providers: readonly string[]): readonly SearchItem[] | null {
    const cacheKey = this.generateCacheKey(query, providers);
    const entry = this.cacheStore.get(cacheKey);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cacheStore.delete(cacheKey);
      return null;
    }

    return entry.data;
  }

  public clearCache(): void {
    this.cacheStore.clear();
  }

  // --- History Methods (AATP-0402, AATP-0405, AATP-0407) ---
  public addSearchHistory(query: string): void {
    if (!this.settingsStore.historyEnabled) return;
    const trimmed = query.trim();
    if (trimmed.length === 0) return;

    this.historyStore = [
      { id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, query: trimmed, timestamp: Date.now() },
      ...this.historyStore.filter(h => h.query.toLowerCase() !== trimmed.toLowerCase())
    ].slice(0, 20); // Keep max 20 recent
  }

  public getSearchHistory(): readonly SearchHistoryEntry[] {
    return this.settingsStore.historyEnabled ? this.historyStore : [];
  }

  public clearSearchHistory(): void {
    this.historyStore = [];
  }

  // --- Settings Methods ---
  public getSettings(): UserSettings {
    return { ...this.settingsStore };
  }

  public updateSettings(partial: Partial<UserSettings>): void {
    this.settingsStore = {
      ...this.settingsStore,
      ...partial
    };
    if (!this.settingsStore.historyEnabled) {
      this.clearSearchHistory();
    }
  }
}
