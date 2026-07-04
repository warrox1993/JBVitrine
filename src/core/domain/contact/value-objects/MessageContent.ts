import { ValidationError } from '../../shared/errors/ValidationError';

export class MessageContent {
  private static readonly MIN_LENGTH = 10;
  private static readonly MAX_LENGTH = 5000;

  private constructor(private readonly value: string) {}

  static create(value: string): MessageContent {
    const trimmedValue = value.trim();
    if (trimmedValue.length < this.MIN_LENGTH) {
      throw new ValidationError(`Message must be at least ${this.MIN_LENGTH} characters long`);
    }
    if (trimmedValue.length > this.MAX_LENGTH) {
      throw new ValidationError(`Message must be at most ${this.MAX_LENGTH} characters long`);
    }
    return new MessageContent(trimmedValue);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: MessageContent): boolean {
    return this.value === other.value;
  }
}
