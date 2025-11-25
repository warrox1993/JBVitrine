import { Lead } from '../../../domain/lead-scoring/entities/Lead';
import { LeadDTO } from '../dtos/LeadDTO';

export class LeadMapper {
  static toDTO(entity: Lead): LeadDTO {
    return {
      id: entity.id,
      email: entity.email.getValue(),
      source: entity.source.getValue(),
      score: entity.score?.value.getValue(),
      priority: entity.score?.priority.getValue(),
      breakdown: entity.score?.breakdown,
      createdAt: entity.createdAt.toISOString(),
    };
  }
}
