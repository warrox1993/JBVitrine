import { Lead } from '../entities/Lead';

export interface ILeadScoringRepository {
  save(lead: Lead): Promise<void>;
  findById(id: string): Promise<Lead | null>;
  findByEmail(email: string): Promise<Lead | null>;
}
