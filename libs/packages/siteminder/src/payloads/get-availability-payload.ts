export class GetAvailabilityPayload {
    public packagePath: string;
    public start: Date;
    public end: Date;

    constructor(init?: Partial<GetAvailabilityPayload>) {
        Object.assign(this, init);
    }
}