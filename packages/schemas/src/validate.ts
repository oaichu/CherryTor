import type { Category, SearchItem, ProviderSearchQuery, RankingSignals } from './item.ts';

export interface ValidationSuccess<T> {
  readonly ok: true;
  readonly value: T;
}

export interface ValidationFailure {
  readonly ok: false;
  readonly errors: readonly string[];
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

const ALLOWED_CATEGORIES: ReadonlySet<Category> = new Set([
  'Software',
  'Movies',
  'TV',
  'Anime',
  'Music',
  'Games',
  'Books',
  'Other'
]);

const HEX40_REGEX = /^[0-9a-fA-F]{40}$/;
const BASE32_REGEX = /^[2-7a-zA-Z]{32}$/;
const ISO8601_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2}))?$/;

export function validateSearchItem(input: unknown): ValidationResult<SearchItem> {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false, errors: ['Input must be a non-null object'] };
  }

  const obj = input as Record<string, unknown>;

  // id validation
  if (typeof obj['id'] !== 'string' || obj['id'].trim().length === 0 || obj['id'].length > 128) {
    errors.push('id must be a non-empty string <= 128 chars');
  }

  // title validation
  if (typeof obj['title'] !== 'string' || obj['title'].trim().length === 0 || obj['title'].length > 500) {
    errors.push('title must be a non-empty string <= 500 chars');
  }

  // category validation
  if (typeof obj['category'] !== 'string' || !ALLOWED_CATEGORIES.has(obj['category'] as Category)) {
    errors.push(`category must be one of: ${Array.from(ALLOWED_CATEGORIES).join(', ')}`);
  }

  // sizeBytes validation
  if (obj['sizeBytes'] !== null && obj['sizeBytes'] !== undefined) {
    if (typeof obj['sizeBytes'] !== 'number' || !Number.isInteger(obj['sizeBytes']) || obj['sizeBytes'] < 0) {
      errors.push('sizeBytes must be null or a non-negative integer');
    }
  }

  // seeders validation
  if (obj['seeders'] !== null && obj['seeders'] !== undefined) {
    if (typeof obj['seeders'] !== 'number' || !Number.isInteger(obj['seeders']) || obj['seeders'] < 0) {
      errors.push('seeders must be null or a non-negative integer');
    }
  }

  // leechers validation
  if (obj['leechers'] !== null && obj['leechers'] !== undefined) {
    if (typeof obj['leechers'] !== 'number' || !Number.isInteger(obj['leechers']) || obj['leechers'] < 0) {
      errors.push('leechers must be null or a non-negative integer');
    }
  }

  // infoHash validation
  if (typeof obj['infoHash'] !== 'string' || (!HEX40_REGEX.test(obj['infoHash']) && !BASE32_REGEX.test(obj['infoHash']))) {
    errors.push('infoHash must be a valid 40-char hex or 32-char base32 string');
  }

  // magnetUri validation
  if (obj['magnetUri'] !== undefined && obj['magnetUri'] !== null) {
    if (typeof obj['magnetUri'] !== 'string' || !obj['magnetUri'].startsWith('magnet:?xt=urn:btih:')) {
      errors.push('magnetUri must begin with magnet:?xt=urn:btih:');
    }
  }

  // sourceId validation
  if (typeof obj['sourceId'] !== 'string' || obj['sourceId'].trim().length === 0 || obj['sourceId'].length > 64) {
    errors.push('sourceId must be a non-empty string <= 64 chars');
  }

  // publishedAt validation
  if (obj['publishedAt'] !== undefined && obj['publishedAt'] !== null) {
    if (typeof obj['publishedAt'] !== 'string' || !ISO8601_REGEX.test(obj['publishedAt'])) {
      errors.push('publishedAt must be a valid ISO-8601 timestamp');
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const validatedItem: SearchItem = {
    id: obj['id'] as string,
    title: (obj['title'] as string).trim(),
    category: obj['category'] as Category,
    sizeBytes: (obj['sizeBytes'] as number | null | undefined) ?? null,
    seeders: (obj['seeders'] as number | null | undefined) ?? null,
    leechers: (obj['leechers'] as number | null | undefined) ?? null,
    infoHash: (obj['infoHash'] as string).toLowerCase(),
    sourceId: (obj['sourceId'] as string).trim(),
    ...(typeof obj['magnetUri'] === 'string' ? { magnetUri: obj['magnetUri'] } : {}),
    ...(typeof obj['publishedAt'] === 'string' ? { publishedAt: obj['publishedAt'] } : {}),
    ...(typeof obj['rankingSignals'] === 'object' && obj['rankingSignals'] !== null
      ? { rankingSignals: obj['rankingSignals'] as RankingSignals }
      : {})
  };

  return {
    ok: true,
    value: validatedItem
  };
}

export function validateProviderSearchQuery(input: unknown): ValidationResult<ProviderSearchQuery> {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false, errors: ['Query payload must be an object'] };
  }

  const obj = input as Record<string, unknown>;

  if (typeof obj['provider'] !== 'string' || obj['provider'].trim().length === 0 || obj['provider'].length > 64) {
    errors.push('provider must be a valid provider identifier');
  }

  if (typeof obj['query'] !== 'string' || obj['query'].trim().length === 0 || obj['query'].length > 200) {
    errors.push('query must be between 1 and 200 characters');
  }

  if (obj['category'] !== undefined && obj['category'] !== null) {
    if (obj['category'] !== 'ALL' && !ALLOWED_CATEGORIES.has(obj['category'] as Category)) {
      errors.push('category is invalid');
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      provider: (obj['provider'] as string).trim(),
      query: (obj['query'] as string).trim(),
      category: (obj['category'] as Category | 'ALL' | undefined) ?? 'ALL'
    }
  };
}
