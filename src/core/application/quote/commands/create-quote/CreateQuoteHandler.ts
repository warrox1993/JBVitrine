import { IQuoteRepository } from '../../../../domain/quote/repositories/IQuoteRepository';
import { QuotePricingService } from '../../../../domain/quote/services/QuotePricingService';
import { Quote } from '../../../../domain/quote/entities/Quote';
import { CreateQuoteCommand } from './CreateQuoteCommand';
import { randomUUID } from 'crypto';

export interface CreateQuoteResult {
  id: string;
  totalAmount: number;
  currency: string;
}

export class CreateQuoteHandler {
  constructor(
    private readonly quoteRepository: IQuoteRepository,
    private readonly pricingService: QuotePricingService
    // TODO: Add EmailService dependency
  ) {}

  async execute(command: CreateQuoteCommand): Promise<CreateQuoteResult> {
    // 1. Calculate items based on project type and features
    const items = this.pricingService.calculateInitialEstimate(
      command.projectType,
      command.features
    );

    // 2. Create Quote entity
    const quote = Quote.create(
      randomUUID(),
      command.email,
      command.name,
      command.projectType,
      items,
      command.company
    );

    // 3. Save to repository
    await this.quoteRepository.save(quote);

    // TODO: Send email confirmation

    return {
      id: quote.id,
      totalAmount: quote.totalAmount.getAmount(),
      currency: quote.totalAmount.getCurrency(),
    };
  }
}
