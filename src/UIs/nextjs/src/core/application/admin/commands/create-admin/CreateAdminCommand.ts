export class CreateAdminCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly roleName: string,
    public readonly permissions: string[]
  ) {}
}
