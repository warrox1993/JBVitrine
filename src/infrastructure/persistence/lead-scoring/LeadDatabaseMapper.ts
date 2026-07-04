import { Lead } from '../../../core/domain/lead-scoring/entities/Lead';
import { Score } from '../../../core/domain/lead-scoring/entities/Score';
import { Enrichment } from '../../../core/domain/lead-scoring/entities/Enrichment';

export class LeadDatabaseMapper {
  static toDomain(row: any): Lead {
    const lead = Lead.create(
      row.id,
      row.email,
      row.source
    );

    if (row.score_value !== null) {
      lead.updateScore(
        Score.create(
          row.id, // Score shares ID with Lead for 1:1 relationship
          row.score_value,
          row.score_breakdown || {}
        )
      );
    }

    if (row.enrichment_data) {
      lead.enrich(
        Enrichment.create(
          row.id, // Enrichment shares ID with Lead for 1:1 relationship
          row.enrichment_data,
          row.enrichment_source || 'unknown'
        )
      );
    }

    return lead;
  }

  static toDatabase(entity: Lead): any {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      source: entity.source.getValue(),
      score_value: entity.score?.value.getValue() ?? null,
      score_breakdown: entity.score?.breakdown ? JSON.stringify(entity.score.breakdown) : null,
      enrichment_data: entity.enrichment?.data ? JSON.stringify(entity.enrichment.data) : null,
      enrichment_source: entity.enrichment?.source ?? null,
      created_at: entity.createdAt,
    };
  }
}
