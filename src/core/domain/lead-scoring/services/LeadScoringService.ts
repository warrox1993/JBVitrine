import { Lead } from '../entities/Lead';
import { Score } from '../entities/Score';
import { randomUUID } from 'crypto';

export class LeadScoringService {
  calculateScore(lead: Lead): Score {
    let totalScore = 0;
    const breakdown: Record<string, number> = {};

    // 1. Email Score
    if (lead.email.isProfessional()) {
      totalScore += 30;
      breakdown['professional_email'] = 30;
    } else {
      totalScore += 10;
      breakdown['personal_email'] = 10;
    }

    // 2. Source Score
    switch (lead.source.getValue()) {
      case 'quote_wizard':
        totalScore += 20;
        breakdown['source_quote'] = 20;
        break;
      case 'contact_form':
        totalScore += 10;
        breakdown['source_contact'] = 10;
        break;
      default:
        totalScore += 5;
        breakdown['source_other'] = 5;
    }

    // 3. Enrichment Score (if available)
    if (lead.enrichment) {
      const data = lead.enrichment.data;
      if (data.companySize && data.companySize > 10) {
        totalScore += 20;
        breakdown['company_size'] = 20;
      }
      if (data.industry && ['Technology', 'Finance'].includes(data.industry)) {
        totalScore += 15;
        breakdown['industry_target'] = 15;
      }
    }

    // Cap score at 100
    totalScore = Math.min(100, totalScore);

    return Score.create(randomUUID(), totalScore, breakdown);
  }
}
