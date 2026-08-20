import test from 'node:test';
import assert from 'node:assert/strict';
import { CircuitBreaker } from '../../packages/core/src/circuit-breaker.ts';

test('Circuit Breaker - opens after configured consecutive failures', () => {
  const cb = new CircuitBreaker('test-provider', { failureThreshold: 3, cooldownMs: 1000 });
  assert.equal(cb.getState(), 'CLOSED');
  assert.equal(cb.canExecute(), true);

  cb.recordFailure();
  cb.recordFailure();
  assert.equal(cb.getState(), 'CLOSED');

  cb.recordFailure(); // 3rd failure
  assert.equal(cb.getState(), 'OPEN');
  assert.equal(cb.canExecute(), false);
  assert.throws(() => cb.assertCanExecute(), /circuit breaker is OPEN/);
});

test('Circuit Breaker - closes upon recordSuccess', () => {
  const cb = new CircuitBreaker('test-provider', { failureThreshold: 2, cooldownMs: 1000 });
  cb.recordFailure();
  cb.recordFailure();
  assert.equal(cb.getState(), 'OPEN');

  cb.recordSuccess();
  assert.equal(cb.getState(), 'CLOSED');
  assert.equal(cb.canExecute(), true);
});
