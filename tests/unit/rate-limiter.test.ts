import test from 'node:test';
import assert from 'node:assert/strict';
import { SlidingWindowRateLimiter } from '../../packages/core/src/rate-limiter.ts';

test('Rate Limiter - allows requests within quota and tracks remaining', () => {
  const limiter = new SlidingWindowRateLimiter({ maxRequests: 3, windowMs: 1000 });
  const ip = '192.168.1.50';

  const res1 = limiter.check(ip, 1000);
  assert.equal(res1.allowed, true);
  assert.equal(res1.remaining, 2);

  const res2 = limiter.check(ip, 1200);
  assert.equal(res2.allowed, true);
  assert.equal(res2.remaining, 1);

  const res3 = limiter.check(ip, 1400);
  assert.equal(res3.allowed, true);
  assert.equal(res3.remaining, 0);

  // 4th request exceeds quota
  const res4 = limiter.check(ip, 1500);
  assert.equal(res4.allowed, false);
  assert.equal(res4.remaining, 0);
  assert.ok(res4.retryAfterSeconds >= 1);
});

test('Rate Limiter - sliding window recovers after window expiration', () => {
  const limiter = new SlidingWindowRateLimiter({ maxRequests: 2, windowMs: 1000 });
  const ip = '10.0.0.1';

  limiter.check(ip, 1000);
  limiter.check(ip, 1200);

  // Blocked at 1500
  assert.equal(limiter.check(ip, 1500).allowed, false);

  // After 1000 + 1000 = 2001, the first request expired
  const resAfter = limiter.check(ip, 2005);
  assert.equal(resAfter.allowed, true);
});
