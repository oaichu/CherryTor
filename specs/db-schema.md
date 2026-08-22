# CLIENT STORAGE SPECIFICATION — CHERRYTOR

> **Implementation status (2026-08): DESIGN TARGET — not yet shipped.**
> The served v1 UI persists only bookmarks and settings via `localStorage`
> (see PRIVACY.md). No IndexedDB database is opened by the production page.
> This document describes the storage layer to be implemented in a future cycle.

## IndexedDB Database: `cherrytor_db` (Version 1)

### Object Store: `search_cache`
- **Primary Key**: `cacheKey` (string: `sha256(query + ':' + providerSet + ':' + schemaVersion)`)
- **Indexes**:
  - `expiresAt`: number (timestamp in ms)
- **Schema**:
```typescript
interface CachedSearchEntry {
  cacheKey: string;
  query: string;
  providerSet: string[];
  schemaVersion: number;
  createdAt: number;
  expiresAt: number; // Default TTL: 30 minutes
  data: SearchItem[];
}
```

### Object Store: `search_history`
- **Primary Key**: `id` (auto-incrementing integer or uuid)
- **Indexes**:
  - `timestamp`: number
- **Schema**:
```typescript
interface SearchHistoryEntry {
  id: string;
  query: string;
  timestamp: number;
}
```

### Object Store: `user_settings`
- **Primary Key**: `key` (string)
- **Keys**:
  - `theme`: `"terminal-dark"` | `"terminal-light"`
  - `density`: `"comfortable"` | `"compact"`
  - `crtMode`: `"full"` | `"reduced"` | `"off"`
  - `historyEnabled`: boolean
- **Rule**: Absolutely zero authentication credentials or RPC tokens.
