import { ValidationError } from '../../shared/errors/ValidationError';

export type QuoteStatusValue = 'draft' | 'pending' | 'approved' | 'rejected' | 'expired';

export class QuoteStatus {
  private constructor(private readonly value: QuoteStatusValue) {}

  static create(value: string): QuoteStatus {
    const validStatuses: QuoteStatusValue[] = ['draft', 'pending', 'approved', 'rejected', 'expired'];
    
    if (!validStatuses.includes(value as QuoteStatusValue)) {
      throw new ValidationError(`Invalid quote status: ${value}`);
    }

    return new QuoteStatus(value as QuoteStatusValue);
  }

  getValue(): QuoteStatusValue {
    return this.value;
  }

  isFinal(): boolean {
    return ['approved', 'rejected', 'expired'].includes(this.value);
  }
}
