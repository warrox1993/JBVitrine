export interface Entity {
  id: string;
  equals(other: Entity): boolean;
}
