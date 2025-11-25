import { Lead } from '../entities/Lead';
import { Enrichment } from '../entities/Enrichment';

export interface IEnrichmentProvider {
  enrich(email: string): Promise<Record<string, any>>;
}

export class EnrichmentService {
  constructor(private readonly provider: IEnrichmentProvider) {}

  async enrichLead(lead: Lead): Promise<Enrichment | null> {
    try {
      const data = await this.provider.enrich(lead.email.getValue());
      if (!data) return null;

      return Enrichment.create(lead.id, data, 'external_provider');
    } catch (error) {
      console.error('Enrichment failed:', error);
      return null;
    }
  }
}
