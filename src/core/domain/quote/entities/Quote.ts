import { Entity } from '../../shared/interfaces/IEntity';
import { Email } from '../../shared/value-objects/Email';
import { Money } from '../../shared/value-objects/Money';
import { QuoteStatus } from '../value-objects/QuoteStatus';
import { ProjectType } from '../value-objects/ProjectType';
import { QuoteItem } from './QuoteItem';
import { ValidationError } from '../../shared/errors/ValidationError';

interface QuoteProps {
  id: string;
  email: Email;
  name: string;
  company?: string;
  projectType: ProjectType;
  items: QuoteItem[];
  status: QuoteStatus;
  createdAt: Date;
  validUntil: Date;
}

export class Quote implements Entity {
  private constructor(private readonly props: QuoteProps) {}

  static create(
    id: string,
    email: string,
    name: string,
    projectType: string,
    items: QuoteItem[] = [],
    company?: string,
    createdAt?: Date,
    validUntil?: Date
  ): Quote {
    if (name.length < 2) {
      throw new ValidationError('Name must be at least 2 characters long');
    }

    const created = createdAt || new Date();
    const valid = validUntil || new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days validity

    return new Quote({
      id,
      email: Email.create(email),
      name,
      company,
      projectType: ProjectType.create(projectType),
      items,
      status: QuoteStatus.create('draft'),
      createdAt: created,
      validUntil: valid,
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

  get company(): string | undefined {
    return this.props.company;
  }

  get projectType(): ProjectType {
    return this.props.projectType;
  }

  get items(): QuoteItem[] {
    return [...this.props.items];
  }

  get status(): QuoteStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get validUntil(): Date {
    return this.props.validUntil;
  }

  get totalAmount(): Money {
    return this.props.items.reduce(
      (total, item) => total.add(item.total),
      Money.create(0, 'EUR')
    );
  }

  addItem(item: QuoteItem): void {
    if (this.status.isFinal()) {
      throw new ValidationError('Cannot modify a finalized quote');
    }
    this.props.items.push(item);
  }

  removeItem(itemId: string): void {
    if (this.status.isFinal()) {
      throw new ValidationError('Cannot modify a finalized quote');
    }
    this.props.items = this.props.items.filter(i => i.id !== itemId);
  }

  submit(): void {
    if (this.status.getValue() !== 'draft') {
      throw new ValidationError('Only draft quotes can be submitted');
    }
    this.props.status = QuoteStatus.create('pending');
  }

  approve(): void {
    if (this.status.getValue() !== 'pending') {
      throw new ValidationError('Only pending quotes can be approved');
    }
    this.props.status = QuoteStatus.create('approved');
  }

  reject(): void {
    if (this.status.getValue() !== 'pending') {
      throw new ValidationError('Only pending quotes can be rejected');
    }
    this.props.status = QuoteStatus.create('rejected');
  }

  equals(other: Entity): boolean {
    if (!(other instanceof Quote)) {
      return false;
    }
    return this.id === other.id;
  }
}
