/**
 * Sliding-Window In-Memory Rate Limiter for Edge Gateway
 * In accordance with AATP-0217 & Phase 7 Abuse Resistance
 */

export interface RateLimiterConfig {
  readonly maxRequests: number; // e.g. 60 requests
  readonly windowMs: number; // e.g. 60000ms (1 minute)
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

  constructor(config: RateLimiterConfig = { maxRequests: 60, windowMs: 60000 }) {
    this.config = config;
  }

  public check(clientId: string, now: number = Date.now()): RateLimitResult {
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
