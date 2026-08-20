/**
 * RFC BTIH Magnet Link Parser & Security Validator for CherryTor
 * In accordance with AATP-0501, AATP-0505, AATP-0506
 */

import { ValidationError } from './errors.ts';

export interface ParsedMagnet {
  readonly valid: true;
  readonly infoHash: string; // 40-char lowercase hex or 32-char base32
  readonly displayName: string;
  readonly trackers: readonly string[];
  readonly rawUri: string;
}

const HEX40_REGEX = /^[0-9a-fA-F]{40}$/;
const BASE32_REGEX = /^[2-7a-zA-Z]{32}$/;

// Schemes that must NEVER be processed as magnets (AATP-0506)
const DANGEROUS_SCHEMES = ['javascript:', 'data:', 'file:', 'vbscript:', 'blob:', 'http:', 'https:'];

export function parseAndValidateMagnet(uri: string): ParsedMagnet {
  if (typeof uri !== 'string') {
    throw new ValidationError('Magnet URI must be a string');
  }

  const trimmed = uri.trim();

  // Max URI length guard
  if (trimmed.length > 2048) {
    throw new ValidationError('Magnet URI exceeds maximum length of 2048 characters');
  }

  // Dangerous scheme rejection (AATP-0506)
  const lower = trimmed.toLowerCase();
  for (const scheme of DANGEROUS_SCHEMES) {
    if (lower.startsWith(scheme)) {
      throw new ValidationError(`Dangerous or invalid URI scheme rejected: ${scheme}`);
    }
  }

  if (!trimmed.startsWith('magnet:?')) {
    throw new ValidationError('Magnet URI must begin with magnet:?');
  }

  let params: URLSearchParams;
  try {
    const searchString = trimmed.substring('magnet:?'.length);
    params = new URLSearchParams(searchString);
  } catch {
    throw new ValidationError('Failed to parse magnet search parameters');
  }

  // Parameter count guard
  if (Array.from(params.keys()).length > 50) {
    throw new ValidationError('Parameter count exceeds allowable limit (50)');
  }

  const xt = params.get('xt');
  if (!xt || !xt.toLowerCase().startsWith('urn:btih:')) {
    throw new ValidationError('Magnet URI missing required xt=urn:btih:<hash> parameter');
  }

  const rawHash = xt.substring('urn:btih:'.length).trim();
  if (!HEX40_REGEX.test(rawHash) && !BASE32_REGEX.test(rawHash)) {
    throw new ValidationError('InfoHash in magnet URI failed 40-hex/32-base32 entropy check');
  }

  const displayName = params.get('dn')?.trim() || 'Unnamed';
  const trackers = params.getAll('tr').map(t => t.trim()).filter(t => t.length > 0);

  return {
    valid: true,
    infoHash: rawHash.toLowerCase(),
    displayName,
    trackers,
    rawUri: trimmed
  };
}
