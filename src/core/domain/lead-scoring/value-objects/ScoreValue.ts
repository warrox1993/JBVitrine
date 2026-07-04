import { ValidationError } from '../../shared/errors/ValidationError';

export class ScoreValue {
  private constructor(private readonly value: number) {}

  static create(value: number): ScoreValue {
    if (value < 0 || value > 100) {
      throw new ValidationError('Score must be between 0 and 100');
    }
    return new ScoreValue(value);
  }

  getValue(): number {
    return this.value;
  }

  add(points: number): ScoreValue {
    const newValue = Math.min(100, Math.max(0, this.value + points));
    return new ScoreValue(newValue);
  }

  subtract(points: number): ScoreValue {
    return this.add(-points);
  }
}
