export class SubmitContactCommand {
  constructor(
    public readonly type: string,
    public readonly email: string,
    public readonly name: string,
    public readonly message: string,
    public readonly phone?: string,
    public readonly company?: string
  ) {}
}
