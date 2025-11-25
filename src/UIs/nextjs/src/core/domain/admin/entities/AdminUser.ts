import { Entity } from '../../shared/interfaces/IEntity';
import { Email } from '../../shared/value-objects/Email';
import { Role } from './Role';

interface AdminUserProps {
  email: Email;
  passwordHash: string;
  name: string;
  role: Role;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
}

export class AdminUser implements Entity {
  private constructor(
    public readonly id: string,
    private readonly props: AdminUserProps
  ) {}

  static create(
    id: string,
    email: string,
    passwordHash: string,
    name: string,
    role: Role
  ): AdminUser {
    return new AdminUser(id, {
      email: Email.create(email),
      passwordHash,
      name,
      role,
      isActive: true,
      createdAt: new Date(),
    });
  }

  get email(): Email {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get role(): Role {
    return this.props.role;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastLoginAt(): Date | undefined {
    return this.props.lastLoginAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  hasPermission(permission: string): boolean {
    return this.props.isActive && this.props.role.hasPermission(permission);
  }

  updateLastLogin(): void {
    this.props.lastLoginAt = new Date();
  }

  deactivate(): void {
    this.props.isActive = false;
  }

  activate(): void {
    this.props.isActive = true;
  }

  equals(other: Entity): boolean {
    if (!(other instanceof AdminUser)) {
      return false;
    }
    return this.id === other.id;
  }
}
