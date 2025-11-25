import { Quote } from '../../../domain/quote/entities/Quote';
import { QuoteItem } from '../../../domain/quote/entities/QuoteItem';
import { QuoteDTO, QuoteItemDTO } from '../dtos/QuoteDTO';

export class QuoteMapper {
  static toDTO(entity: Quote): QuoteDTO {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      name: entity.name,
      company: entity.company,
      projectType: entity.projectType.getValue(),
      items: entity.items.map(this.toItemDTO),
      totalAmount: entity.totalAmount.getAmount(),
      currency: entity.totalAmount.getCurrency(),
      status: entity.status.getValue(),
      createdAt: entity.createdAt.toISOString(),
      validUntil: entity.validUntil.toISOString(),
    };
  }

  private static toItemDTO(item: QuoteItem): QuoteItemDTO {
    return {
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice.getAmount(),
      total: item.total.getAmount(),
    };
  }
}
