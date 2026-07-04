import { Entity } from '../../shared/interfaces/IEntity';
import { Email } from '../../shared/value-objects/Email';
import { PhoneNumber } from '../../shared/value-objects/PhoneNumber';
import { ContactType } from '../value-objects/ContactType';
import { MessageContent } from '../value-objects/MessageContent';
import { ValidationError } from '../../shared/errors/ValidationError';

export interface ContactProps {
  id: string;
  email: Email;
  name: string;
  type: ContactType;
  message: MessageContent;
  phone?: PhoneNumber;
  company?: string;
  createdAt: Date;
}

export class Contact implements Entity {
  private constructor(private readonly props: ContactProps) {}

  static create(
    id: string,
    email: string,
    name: string,
    type: string,
    message: string,
    phone?: string,
    company?: string,
    createdAt?: Date
  ): Contact {
    if (name.length < 2) {
      throw new ValidationError('Name must be at least 2 characters long');
    }

    return new Contact({
      id,
      email: Email.create(email),
      name,
      type: ContactType.create(type),
      message: MessageContent.create(message),
      phone: phone ? PhoneNumber.create(phone) : undefined,
      company,
      createdAt: createdAt || new Date(),
    });
  }

  get id(): string {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): ContactType {
    return this.props.type;
  }

  get message(): MessageContent {
    return this.props.message;
  }

  get phone(): PhoneNumber | undefined {
    return this.props.phone;
  }

  get company(): string | undefined {
    return this.props.company;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  isHighPriority(): boolean {
    return (
      this.type.getValue() === 'project' && 
      (this.email.getValue().includes('enterprise') || (this.company !== undefined && this.company.length > 0))
    );
  }

  equals(other: Entity): boolean {
    if (!(other instanceof Contact)) {
      return false;
    }
    return this.id === other.id;
  }
}

