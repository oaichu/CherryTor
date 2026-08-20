import type { SearchItem, NormalizedGatewayResponse, Category } from '../../../../packages/schemas/src/item.ts';
import { deduplicateByInfoHash } from '../../../../packages/core/src/dedup-exact.ts';
import { rankSearchItems } from '../../../../packages/core/src/ranking.ts';

export interface SearchDispatcherOptions {
  readonly gatewayEndpoint?: string; // default '/api/v1/search'
  readonly timeoutMs?: number;
}

export interface SearchBatchUpdate {
  readonly providerId: string;
  readonly newItems: readonly SearchItem[];
  readonly totalRankedItems: readonly SearchItem[];
  readonly error?: string;
  readonly isDone: boolean;
}

export class SearchDispatcher {
  private readonly gatewayEndpoint: string;

  constructor(options: SearchDispatcherOptions = {}) {
    this.gatewayEndpoint = options.gatewayEndpoint || '/api/v1/search';
  }

  public async *search(
    query: string,
    enabledProviders: readonly string[],
    category?: Category | 'ALL',
    signal?: AbortSignal
  ): AsyncIterable<SearchBatchUpdate> {
    const allItems: SearchItem[] = [];
    const pendingCount = enabledProviders.length;
    let completedCount = 0;

    for (const providerId of enabledProviders) {
      if (signal?.aborted) {
        break;
      }

      let batchItems: SearchItem[] = [];
      let batchError: string | undefined;

      try {
        const payload = {
          provider: providerId,
          query,
          category: category || 'ALL'
        };

        const fetchInit: RequestInit = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          ...(signal !== undefined ? { signal } : {})
        };

        const response = await fetch(this.gatewayEndpoint, fetchInit);
        const json: NormalizedGatewayResponse = await response.json();

        if (json.data && Array.isArray(json.data)) {
          batchItems = [...json.data];
          allItems.push(...batchItems);
        }

        if (json.errors && json.errors.length > 0) {
          batchError = json.errors.join(', ');
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          break;
        }
        batchError = err instanceof Error ? err.message : String(err);
      }

      completedCount++;
      const isDone = completedCount >= pendingCount;

      const deduplicated = deduplicateByInfoHash(allItems);
      const ranked = rankSearchItems(deduplicated);

      yield {
        providerId,
        newItems: batchItems,
        totalRankedItems: ranked,
        ...(batchError !== undefined ? { error: batchError } : {}),
        isDone
      };
    }
  }
}
