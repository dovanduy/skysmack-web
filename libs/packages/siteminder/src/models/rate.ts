
export class Rate {
    public start: Date;
    public end: Date
    public lodgingTypeId: number;
    public ratePlanId: number;
    public channels: number[];
    public rate: number;

    public constructor(init?: Partial<Rate>) {
        Object.assign(this, init);
    }
}