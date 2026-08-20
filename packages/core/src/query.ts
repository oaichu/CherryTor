/**
 * Query Validation & Unicode Normalization for CherryTor
 * In accordance with AATP-0203 & AATP-0507
 */

import { ValidationError } from './errors.ts';

// Control characters & zero-width unicode characters
const DANGEROUS_CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g;

export function normalizeAndValidateQuery(rawQuery: unknown): string {
  if (typeof rawQuery !== 'string') {
    throw new ValidationError('Search query must be a string');
  }

  // 1. NFKC Unicode canonical normalization
  const normalized = rawQuery.normalize('NFKC');

  // 2. Strip dangerous control & zero-width characters
  const sanitized = normalized.replace(DANGEROUS_CONTROL_CHARS_REGEX, '').trim();

  // 3. Length checks (1 - 200 chars)
  if (sanitized.length === 0) {
    throw new ValidationError('Search query must not be empty');
  }

  if (sanitized.length > 200) {
    throw new ValidationError('Search query exceeds maximum limit of 200 characters');
  }

  return sanitized;
}
