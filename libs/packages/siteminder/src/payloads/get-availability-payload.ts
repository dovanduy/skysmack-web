export class GetAvailabilityPayload {
    public packagePath: string;
    public start: Date;
    public end: Date;

    public constructor(init?: Partial<GetAvailabilityPayload>) {
    }
}