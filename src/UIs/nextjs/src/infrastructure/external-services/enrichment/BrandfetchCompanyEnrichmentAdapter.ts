import { IEnrichmentProvider } from '../../../core/domain/lead-scoring/services/EnrichmentService';

export class BrandfetchCompanyEnrichmentAdapter implements IEnrichmentProvider {
  constructor(private readonly apiKey: string) {}

  async enrich(domain: string): Promise<Record<string, any>> {
    if (!this.apiKey) {
      console.warn('Brandfetch API key not configured');
      return {};
    }

    try {
      const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        return {};
      }

      return await response.json();
    } catch (error) {
      console.error('Brandfetch API error:', error);
      return {};
    }
  }
}
