import type { ProviderEndpointConfig } from './types.ts';
import type { SearchItem } from '../../schemas/src/item.ts';
import { validateSearchItem } from '../../schemas/src/validate.ts';
import { ProviderBadResponseError } from '../../core/src/errors.ts';

export async function parseProviderResponse(
  config: ProviderEndpointConfig,
  response: Response
): Promise<readonly SearchItem[]> {
  const contentType = response.headers.get('Content-Type') || '';
  const lowerContentType = contentType.toLowerCase();

  // 1. Content-Type verification (INV-04, INV-05, AATP-0206)
  if (lowerContentType.includes('text/html') || lowerContentType.includes('application/xhtml')) {
    throw new ProviderBadResponseError(
      `Raw HTML response rejected from provider ${config.id} (Content-Type: ${contentType})`,
      config.id
    );
  }

  if (config.format === 'json' && !lowerContentType.includes('application/json') && !lowerContentType.includes('text/json')) {
    throw new ProviderBadResponseError(
      `Expected JSON from provider ${config.id} but received Content-Type: ${contentType}`,
      config.id
    );
  }

  // 2. Size Limit Verification
  const contentLength = response.headers.get('Content-Length');
  if (contentLength && parseInt(contentLength, 10) > config.maxPayloadBytes) {
    throw new ProviderBadResponseError(
      `Provider ${config.id} response size (${contentLength} bytes) exceeds limit (${config.maxPayloadBytes} bytes)`,
      config.id
    );
  }

  const rawText = await response.text();
  if (rawText.length > config.maxPayloadBytes) {
    throw new ProviderBadResponseError(
      `Provider ${config.id} payload exceeds maximum allowed size of ${config.maxPayloadBytes} bytes`,
      config.id
    );
  }

  // 3. Parse JSON & Validate Items
  let rawJson: unknown;
  try {
    rawJson = JSON.parse(rawText);
  } catch {
    throw new ProviderBadResponseError(`Failed to parse JSON response from provider ${config.id}`, config.id);
  }

  let itemsArray: unknown[] = [];
  if (Array.isArray(rawJson)) {
    itemsArray = rawJson;
  } else if (typeof rawJson === 'object' && rawJson !== null) {
    const obj = rawJson as Record<string, unknown>;
    if (Array.isArray(obj['items'])) itemsArray = obj['items'];
    else if (Array.isArray(obj['results'])) itemsArray = obj['results'];
    else if (Array.isArray(obj['data'])) itemsArray = obj['data'];
  }

  const validatedItems: SearchItem[] = [];
  for (const rawItem of itemsArray) {
    const result = validateSearchItem(rawItem);
    if (result.ok) {
      validatedItems.push(result.value);
    }
  }

  return validatedItems;
}
