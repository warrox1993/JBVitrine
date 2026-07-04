import { ILeadScoringRepository } from '../../../core/domain/lead-scoring/repositories/ILeadScoringRepository';
import { Lead } from '../../../core/domain/lead-scoring/entities/Lead';
import { LeadDatabaseMapper } from './LeadDatabaseMapper';
import { sql } from '@/lib/db';

export class PostgresLeadScoringRepository implements ILeadScoringRepository {
  async save(lead: Lead): Promise<void> {
    const dbModel = LeadDatabaseMapper.toDatabase(lead);
    
    await sql`
      INSERT INTO leads (
        id, email, source, score_value, score_breakdown, enrichment_data, enrichment_source, created_at
      ) VALUES (
        ${dbModel.id},
        ${dbModel.email},
        ${dbModel.source},
        ${dbModel.score_value},
        ${dbModel.score_breakdown}::jsonb,
        ${dbModel.enrichment_data}::jsonb,
        ${dbModel.enrichment_source},
        ${dbModel.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        source = EXCLUDED.source,
        score_value = EXCLUDED.score_value,
        score_breakdown = EXCLUDED.score_breakdown,
        enrichment_data = EXCLUDED.enrichment_data,
        enrichment_source = EXCLUDED.enrichment_source,
        created_at = EXCLUDED.created_at
    `;
  }

  async findById(id: string): Promise<Lead | null> {
    const result = await sql`
      SELECT * FROM leads WHERE id = ${id}
    `;

    if (result.length === 0) {
      return null;
    }

    return LeadDatabaseMapper.toDomain(result[0]);
  }

  async findByEmail(email: string): Promise<Lead | null> {
    const result = await sql`
      SELECT * FROM leads WHERE email = ${email}
    `;

    if (result.length === 0) {
      return null;
    }

    return LeadDatabaseMapper.toDomain(result[0]);
  }
}
