/**
 * Unified Gateway Error Taxonomy for CherryTor
 * In accordance with AATP-0105
 */

export type GatewayErrorCode =
  | 'PROVIDER_TIMEOUT'
  | 'PROVIDER_BAD_RESPONSE'
  | 'PROVIDER_UNAVAILABLE'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'CLIENT_ERROR'
  | 'INTERNAL_ERROR';

export interface SerializedGatewayError {
  readonly code: GatewayErrorCode;
  readonly message: string;
  readonly providerId?: string;
  readonly details?: readonly string[];
  readonly retryable: boolean;
}

export abstract class CherryTorError extends Error {
  public abstract readonly code: GatewayErrorCode;
  public abstract readonly retryable: boolean;
  public readonly providerId?: string;
  public readonly details?: readonly string[];

  constructor(
    message: string,
    providerId?: string,
    details?: readonly string[]
  ) {
    super(message);
    this.name = this.constructor.name;
    if (providerId !== undefined) {
      this.providerId = providerId;
    }
    if (details !== undefined) {
      this.details = details;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public toJSON(): SerializedGatewayError {
    const obj: SerializedGatewayError = {
      code: this.code,
      message: this.message,
      retryable: this.retryable,
      ...(this.providerId !== undefined ? { providerId: this.providerId } : {}),
      ...(this.details !== undefined && this.details.length > 0 ? { details: this.details } : {})
    };
    return obj;
  }
}

export class ProviderTimeoutError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'PROVIDER_TIMEOUT';
  public readonly retryable: boolean = true;
}

export class ProviderBadResponseError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'PROVIDER_BAD_RESPONSE';
  public readonly retryable: boolean = false;
}

export class ProviderUnavailableError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'PROVIDER_UNAVAILABLE';
  public readonly retryable: boolean = true;
}

export class ValidationError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'VALIDATION_ERROR';
  public readonly retryable: boolean = false;
}

export class RateLimitedError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'RATE_LIMITED';
  public readonly retryable: boolean = true;
}

export class ClientError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'CLIENT_ERROR';
  public readonly retryable: boolean = false;
}

export class InternalError extends CherryTorError {
  public readonly code: GatewayErrorCode = 'INTERNAL_ERROR';
  public readonly retryable: boolean = false;
}

export function mapErrorToGatewayResponse(error: unknown, fallbackProviderId?: string): SerializedGatewayError {
  if (error instanceof CherryTorError) {
    return error.toJSON();
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return new ProviderTimeoutError(error.message, fallbackProviderId).toJSON();
    }
    return new InternalError(error.message, fallbackProviderId).toJSON();
  }

  return new InternalError('An unexpected unknown error occurred', fallbackProviderId).toJSON();
}
