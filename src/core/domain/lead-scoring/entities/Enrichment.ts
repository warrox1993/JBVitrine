import { Entity } from '../../shared/interfaces/IEntity';

interface EnrichmentProps {
  data: Record<string, any>;
  source: string;
  enrichedAt: Date;
}

export class Enrichment implements Entity {
  private constructor(
    public readonly id: string,
    private readonly props: EnrichmentProps
  ) {}

  static create(id: string, data: Record<string, any>, source: string): Enrichment {
    return new Enrichment(id, {
      data,
      source,
      enrichedAt: new Date(),
    });
  }

  get data(): Record<string, any> {
    return { ...this.props.data };
  }

  get source(): string {
    return this.props.source;
  }

  get enrichedAt(): Date {
    return this.props.enrichedAt;
  }

  equals(other: Entity): boolean {
    if (!(other instanceof Enrichment)) {
      return false;
    }
    return this.id === other.id;
  }
}
