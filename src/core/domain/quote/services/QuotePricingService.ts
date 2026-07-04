
import { QuoteItem } from '../entities/QuoteItem';
import { Money } from '../../shared/value-objects/Money';
import { randomUUID } from 'crypto';

export class QuotePricingService {
  calculateInitialEstimate(projectType: string, features: string[]): QuoteItem[] {
    const items: QuoteItem[] = [];

    // Base price based on project type
    let basePrice = 0;
    switch (projectType) {
      case 'website':
        basePrice = 1500;
        break;
      case 'ecommerce':
        basePrice = 3000;
        break;
      case 'webapp':
        basePrice = 5000;
        break;
      case 'mobile':
        basePrice = 8000;
        break;
      default:
        basePrice = 1000;
    }

    items.push(
      QuoteItem.create(
        randomUUID(),
        `Base price for ${projectType}`,
        1,
        Money.create(basePrice, 'EUR')
      )
    );

    // Feature pricing
    for (const feature of features) {
      items.push(
        QuoteItem.create(
          randomUUID(),
          `Feature: ${feature}`,
          1,
          Money.create(500, 'EUR') // Simplified pricing
        )
      );
    }

    return items;
  }
}
