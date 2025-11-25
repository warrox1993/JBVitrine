import { ILeadScoringRepository } from '../../../../domain/lead-scoring/repositories/ILeadScoringRepository';
import { LeadScoringService } from '../../../../domain/lead-scoring/services/LeadScoringService';
import { EnrichmentService } from '../../../../domain/lead-scoring/services/EnrichmentService';
import { Lead } from '../../../../domain/lead-scoring/entities/Lead';
import { ScoreLeadCommand } from './ScoreLeadCommand';
import { randomUUID } from 'crypto';

export interface ScoreLeadResult {
  id: string;
  score: number;
  priority: string;
  breakdown: Record<string, number>;
}

export class ScoreLeadHandler {
  constructor(
    private readonly leadRepository: ILeadScoringRepository,
    private readonly scoringService: LeadScoringService,
    private readonly enrichmentService: EnrichmentService
  ) {}

  async execute(command: ScoreLeadCommand): Promise<ScoreLeadResult> {
    // 1. Create Lead entity
    const lead = Lead.create(
      randomUUID(),
      command.email,
      command.source
    );

    // 2. Enrich Lead (optional but recommended)
    const enrichment = await this.enrichmentService.enrichLead(lead);
    if (enrichment) {
      lead.enrich(enrichment);
    }

    // 3. Calculate Score
    const score = this.scoringService.calculateScore(lead);
    lead.updateScore(score);

    // 4. Save to repository
    await this.leadRepository.save(lead);

    return {
      id: lead.id,
      score: score.value.getValue(),
      priority: score.priority.getValue(),
      breakdown: score.breakdown,
    };
  }
}
