export interface LeadDTO {
  id: string;
  email: string;
  source: string;
  score?: number;
  priority?: string;
  breakdown?: Record<string, number>;
  createdAt: string;
}

export interface ScoreLeadDTO {
  email: string;
  source: string;
  data?: Record<string, any>;
}
