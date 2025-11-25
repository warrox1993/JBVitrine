import { Entity } from '../../shared/interfaces/IEntity';
import { Money } from '../../shared/value-objects/Money';

interface QuoteItemProps {
  id: string;
  description: string;
  quantity: number;
  unitPrice: Money;
}

export class QuoteItem implements Entity {
  private constructor(private readonly props: QuoteItemProps) {}

  static create(id: string, description: string, quantity: number, unitPrice: Money): QuoteItem {
    return new QuoteItem({
      id,
      description,
      quantity,
      unitPrice,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get description(): string {
    return this.props.description;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unitPrice(): Money {
    return this.props.unitPrice;
  }

  get total(): Money {
    return this.props.unitPrice.multiply(this.props.quantity);
  }

  equals(other: Entity): boolean {
    if (!(other instanceof QuoteItem)) {
      return false;
    }
    return this.id === other.id;
  }
}
