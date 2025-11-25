export class CreateQuoteCommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly projectType: string,
    public readonly features: string[],
    public readonly company?: string
  ) {}
}
