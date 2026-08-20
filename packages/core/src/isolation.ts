import type { SearchItem } from '../../schemas/src/item.ts';
import { mapErrorToGatewayResponse } from './errors.ts';

export interface ProviderTaskResult {
  readonly providerId: string;
  readonly data: readonly SearchItem[];
  readonly error?: string;
}

export async function executeIsolatedProviderSearch(
  providerId: string,
  searchTask: () => Promise<readonly SearchItem[]>
): Promise<ProviderTaskResult> {
  try {
    const data = await searchTask();
    return { providerId, data };
  } catch (err: unknown) {
    const serialized = mapErrorToGatewayResponse(err, providerId);
    return {
      providerId,
      data: [],
      error: `[${serialized.code}] ${serialized.message}`
    };
  }
}
