import { IEnrichmentProvider } from '../../../core/domain/lead-scoring/services/EnrichmentService';

export class HunterEmailValidationAdapter implements IEnrichmentProvider {
  constructor(private readonly apiKey: string) {}

  async enrich(email: string): Promise<Record<string, any>> {
    if (!this.apiKey) {
      console.warn('Hunter API key not configured');
      return {};
    }

    try {
      const response = await fetch(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${this.apiKey}`
      );

      if (!response.ok) {
        return {};
      }

      const data = await response.json();
      return data.data || {};
    } catch (error) {
      console.error('Hunter API error:', error);
      return {};
    }
  }
}
