/**
 * Sliding-Window In-Memory Rate Limiter for Edge Gateway
 * In accordance with AATP-0217 & Phase 7 Abuse Resistance
 */

export interface RateLimiterConfig {
  readonly maxRequests: number; // e.g. 60 requests
  readonly windowMs: number; // e.g. 60000ms (1 minute)
  readonly maxTrackedClients?: number; // sweep threshold, default 5000
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetTimestamp: number;
  readonly retryAfterSeconds: number;
}

export class SlidingWindowRateLimiter {
  private readonly clients = new Map<string, number[]>();
  public readonly config: RateLimiterConfig;
  private readonly maxTrackedClients: number;

  constructor(config: RateLimiterConfig = { maxRequests: 60, windowMs: 60000 }) {
    this.config = config;
    this.maxTrackedClients = config.maxTrackedClients ?? 5000;
  }

  /**
   * Once the map outgrows the tracking cap, drop every client whose window has
   * fully expired — idle clients must not accumulate isolate memory forever
   * (AATP-D2 / FIND-007).
   */
  private pruneStaleClients(now: number): void {
    if (this.clients.size <= this.maxTrackedClients) return;
    const windowStart = now - this.config.windowMs;
    for (const [id, stamps] of this.clients) {
      if (!stamps.some(t => t > windowStart)) {
        this.clients.delete(id);
      }
    }
  }

  public trackedClientCount(): number {
    return this.clients.size;
  }

  public check(clientId: string, now: number = Date.now()): RateLimitResult {
    this.pruneStaleClients(now);
    const windowStart = now - this.config.windowMs;
    const timestamps = this.clients.get(clientId) || [];

    // Filter out timestamps outside the active sliding window
    const activeTimestamps = timestamps.filter(t => t > windowStart);

    if (activeTimestamps.length >= this.config.maxRequests) {
      const oldestTimestamp = activeTimestamps[0] ?? now;
      const resetTimestamp = oldestTimestamp + this.config.windowMs;
      const retryAfterSeconds = Math.max(1, Math.ceil((resetTimestamp - now) / 1000));

      this.clients.set(clientId, activeTimestamps);
      return {
        allowed: false,
        remaining: 0,
        resetTimestamp,
        retryAfterSeconds
      };
    }

    // Record this request
    activeTimestamps.push(now);
    this.clients.set(clientId, activeTimestamps);

    return {
      allowed: true,
      remaining: this.config.maxRequests - activeTimestamps.length,
      resetTimestamp: now + this.config.windowMs,
      retryAfterSeconds: 0
    };
  }

  public reset(clientId?: string): void {
    if (clientId) {
      this.clients.delete(clientId);
    } else {
      this.clients.clear();
    }
  }
}
