export class ScoreLeadCommand {
  constructor(
    public readonly email: string,
    public readonly source: string,
    public readonly data?: Record<string, any>
  ) {}
}
