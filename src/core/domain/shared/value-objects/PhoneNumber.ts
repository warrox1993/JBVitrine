export class PhoneNumber {
  private constructor(private readonly value: string) {}

  static create(phone: string): PhoneNumber {
    if (!this.isValid(phone)) {
      throw new Error(`Invalid phone number format: ${phone}`);
    }
    return new PhoneNumber(phone.replace(/\s/g, ''));
  }

  private static isValid(phone: string): boolean {
    // Basic validation: allows +, spaces, dashes, parentheses, and digits. Min 8 chars.
    // const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    // A simpler regex for international numbers often used in validation
    const simpleRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
    return simpleRegex.test(phone);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
}
