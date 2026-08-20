import { ProviderTimeoutError } from './errors.ts';

export async function withTimeout<T>(
  promiseFactory: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
  providerId?: string
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(new ProviderTimeoutError(`Operation timed out after ${timeoutMs}ms`, providerId));
  }, timeoutMs);

  try {
    const result = await promiseFactory(controller.signal);
    return result;
  } catch (err: unknown) {
    if (controller.signal.aborted) {
      throw new ProviderTimeoutError(`Provider request timed out after ${timeoutMs}ms`, providerId);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
