import { Entity } from '../../shared/interfaces/IEntity';
import { ScoreValue } from '../value-objects/ScoreValue';
import { Priority } from '../value-objects/Priority';

interface ScoreProps {
  value: ScoreValue;
  breakdown: Record<string, number>;
  calculatedAt: Date;
}

export class Score implements Entity {
  private constructor(
    public readonly id: string,
    private readonly props: ScoreProps
  ) {}

  static create(id: string, value: number, breakdown: Record<string, number>): Score {
    return new Score(id, {
      value: ScoreValue.create(value),
      breakdown,
      calculatedAt: new Date(),
    });
  }

  get value(): ScoreValue {
    return this.props.value;
  }

  get breakdown(): Record<string, number> {
    return { ...this.props.breakdown };
  }

  get calculatedAt(): Date {
    return this.props.calculatedAt;
  }

  get priority(): Priority {
    return Priority.fromScore(this.props.value.getValue());
  }

  equals(other: Entity): boolean {
    if (!(other instanceof Score)) {
      return false;
    }
    return this.id === other.id;
  }
}
