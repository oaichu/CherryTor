import { ProviderUnavailableError } from './errors.ts';

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerConfig {
  readonly failureThreshold: number; // e.g. 3
  readonly cooldownMs: number; // e.g. 30000 (30s)
}

export class CircuitBreaker {
  public readonly providerId: string;
  public readonly config: CircuitBreakerConfig;
  private state: CircuitState = 'CLOSED';
  private consecutiveFailures: number = 0;
  private nextAttemptTimestamp: number = 0;

  constructor(
    providerId: string,
    config: CircuitBreakerConfig = { failureThreshold: 3, cooldownMs: 30000 }
  ) {
    this.providerId = providerId;
    this.config = config;
  }

  public getState(): CircuitState {
    if (this.state === 'OPEN' && Date.now() >= this.nextAttemptTimestamp) {
      this.state = 'HALF_OPEN';
    }
    return this.state;
  }

  public canExecute(): boolean {
    const currentState = this.getState();
    return currentState === 'CLOSED' || currentState === 'HALF_OPEN';
  }

  public recordSuccess(): void {
    this.consecutiveFailures = 0;
    this.state = 'CLOSED';
    this.nextAttemptTimestamp = 0;
  }

  public recordFailure(): void {
    this.consecutiveFailures++;
    if (this.consecutiveFailures >= this.config.failureThreshold || this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
      this.nextAttemptTimestamp = Date.now() + this.config.cooldownMs;
    }
  }

  public assertCanExecute(): void {
    if (!this.canExecute()) {
      const waitRemaining = Math.max(0, Math.ceil((this.nextAttemptTimestamp - Date.now()) / 1000));
      throw new ProviderUnavailableError(
        `Provider ${this.providerId} circuit breaker is OPEN. Cooldown remaining: ${waitRemaining}s`,
        this.providerId
      );
    }
  }
}
