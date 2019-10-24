export class GetRatesPayload {
    public packagePath: string;
    public start: Date;
    public end: Date;

    public constructor(init?: Partial<GetRatesPayload>) {
        Object.assign(this, init);
    }
}