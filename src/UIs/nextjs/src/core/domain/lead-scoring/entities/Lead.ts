import { Entity } from '../../shared/interfaces/IEntity';
import { Email } from '../../shared/value-objects/Email';
import { Source } from '../value-objects/Source';
import { Score } from './Score';
import { Enrichment } from './Enrichment';

interface LeadProps {
  email: Email;
  source: Source;
  score?: Score;
  enrichment?: Enrichment;
  createdAt: Date;
}

export class Lead implements Entity {
  private constructor(
    public readonly id: string,
    private readonly props: LeadProps
  ) {}

  static create(id: string, email: string, source: string): Lead {
    return new Lead(id, {
      email: Email.create(email),
      source: Source.create(source),
      createdAt: new Date(),
    });
  }

  get email(): Email {
    return this.props.email;
  }

  get source(): Source {
    return this.props.source;
  }

  get score(): Score | undefined {
    return this.props.score;
  }

  get enrichment(): Enrichment | undefined {
    return this.props.enrichment;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  updateScore(score: Score): void {
    this.props.score = score;
  }

  enrich(enrichment: Enrichment): void {
    this.props.enrichment = enrichment;
  }

  equals(other: Entity): boolean {
    if (!(other instanceof Lead)) {
      return false;
    }
    return this.id === other.id;
  }
}
