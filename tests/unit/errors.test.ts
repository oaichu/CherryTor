import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ProviderTimeoutError,
  ProviderBadResponseError,
  ValidationError,
  RateLimitedError,
  mapErrorToGatewayResponse
} from '../../packages/core/src/errors.ts';

test('Error Taxonomy - properly maps error codes and retryable flags', () => {
  const timeoutErr = new ProviderTimeoutError('Upstream timed out', 'canonical-releases');
  assert.equal(timeoutErr.code, 'PROVIDER_TIMEOUT');
  assert.equal(timeoutErr.retryable, true);
  assert.equal(timeoutErr.providerId, 'canonical-releases');

  const valErr = new ValidationError('Bad query parameter', undefined, ['query too long']);
  assert.equal(valErr.code, 'VALIDATION_ERROR');
  assert.equal(valErr.retryable, false);
  assert.deepEqual(valErr.details, ['query too long']);
});

test('mapErrorToGatewayResponse - maps standard AbortError to ProviderTimeoutError', () => {
  const abortErr = new Error('The operation was aborted');
  abortErr.name = 'AbortError';

  const mapped = mapErrorToGatewayResponse(abortErr, 'arch-mirror');
  assert.equal(mapped.code, 'PROVIDER_TIMEOUT');
  assert.equal(mapped.retryable, true);
  assert.equal(mapped.providerId, 'arch-mirror');
});

test('mapErrorToGatewayResponse - maps generic Error to InternalError', () => {
  const generic = new Error('Database disk failure');
  const mapped = mapErrorToGatewayResponse(generic);
  assert.equal(mapped.code, 'INTERNAL_ERROR');
  assert.equal(mapped.retryable, false);
});
