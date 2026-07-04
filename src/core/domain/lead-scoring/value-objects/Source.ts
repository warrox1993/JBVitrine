import { ValidationError } from '../../shared/errors/ValidationError';

export type SourceType = 'contact_form' | 'quote_wizard' | 'manual' | 'import';

export class Source {
  private constructor(private readonly value: SourceType) {}

  static create(value: string): Source {
    const validSources: SourceType[] = ['contact_form', 'quote_wizard', 'manual', 'import'];
    
    if (!validSources.includes(value as SourceType)) {
      throw new ValidationError(`Invalid source: ${value}`);
    }

    return new Source(value as SourceType);
  }

  getValue(): SourceType {
    return this.value;
  }
}
