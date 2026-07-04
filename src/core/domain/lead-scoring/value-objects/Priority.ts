import { ValidationError } from '../../shared/errors/ValidationError';

export type PriorityLevel = 'low' | 'medium' | 'high';

export class Priority {
  private constructor(private readonly value: PriorityLevel) {}

  static create(value: string): Priority {
    const validPriorities: PriorityLevel[] = ['low', 'medium', 'high'];
    
    if (!validPriorities.includes(value as PriorityLevel)) {
      throw new ValidationError(`Invalid priority level: ${value}`);
    }

    return new Priority(value as PriorityLevel);
  }

  static fromScore(score: number): Priority {
    if (score >= 80) return new Priority('high');
    if (score >= 50) return new Priority('medium');
    return new Priority('low');
  }

  getValue(): PriorityLevel {
    return this.value;
  }

  isHigh(): boolean {
    return this.value === 'high';
  }
}
