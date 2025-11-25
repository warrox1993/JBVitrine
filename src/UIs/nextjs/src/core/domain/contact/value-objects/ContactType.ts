import { ValidationError } from '../../shared/errors/ValidationError';

export type ContactTypeEnum = 'project' | 'support' | 'partnership' | 'general';

export class ContactType {
  private constructor(private readonly value: ContactTypeEnum) {}

  static create(value: string): ContactType {
    if (!this.isValid(value)) {
      throw new ValidationError(`Invalid contact type: ${value}`);
    }
    return new ContactType(value as ContactTypeEnum);
  }

  private static isValid(value: string): boolean {
    const validTypes: ContactTypeEnum[] = ['project', 'support', 'partnership', 'general'];
    return validTypes.includes(value as ContactTypeEnum);
  }

  getValue(): ContactTypeEnum {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: ContactType): boolean {
    return this.value === other.value;
  }
}
