import { Entity } from '../../shared/interfaces/IEntity';
import { Permission } from '../value-objects/Permission';

interface RoleProps {
  name: string;
  permissions: Permission[];
  description?: string;
}

export class Role implements Entity {
  private constructor(
    public readonly id: string,
    private readonly props: RoleProps
  ) {}

  static create(id: string, name: string, permissions: string[], description?: string): Role {
    return new Role(id, {
      name,
      permissions: permissions.map(p => Permission.create(p)),
      description,
    });
  }

  get name(): string {
    return this.props.name;
  }

  get permissions(): Permission[] {
    return [...this.props.permissions];
  }

  get description(): string | undefined {
    return this.props.description;
  }

  hasPermission(permission: string): boolean {
    return this.props.permissions.some(p => p.getValue() === permission);
  }

  addPermission(permission: string): void {
    if (!this.hasPermission(permission)) {
      this.props.permissions.push(Permission.create(permission));
    }
  }

  removePermission(permission: string): void {
    this.props.permissions = this.props.permissions.filter(p => p.getValue() !== permission);
  }

  equals(other: Entity): boolean {
    if (!(other instanceof Role)) {
      return false;
    }
    return this.id === other.id;
  }
}
