import { Quote } from '../../../core/domain/quote/entities/Quote';
import { QuoteItem } from '../../../core/domain/quote/entities/QuoteItem';
import { Money } from '../../../core/domain/shared/value-objects/Money';

export class QuoteDatabaseMapper {
  static toDomain(row: any): Quote {
    const items = (row.items || []).map((item: any) =>
      QuoteItem.create(
        item.id,
        item.description,
        item.quantity,
        Money.create(item.unit_price, item.currency || 'EUR')
      )
    );

    return Quote.create(
      row.id,
      row.email,
      row.name,
      row.project_type,
      items,
      row.company,
      new Date(row.created_at),
      new Date(row.valid_until)
    );
  }

  static toDatabase(entity: Quote): any {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      name: entity.name,
      company: entity.company,
      project_type: entity.projectType.getValue(),
      items: JSON.stringify(entity.items.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice.getAmount(),
        currency: item.unitPrice.getCurrency(),
      }))),
      status: entity.status.getValue(),
      created_at: entity.createdAt,
      valid_until: entity.validUntil,
    };
  }
}
