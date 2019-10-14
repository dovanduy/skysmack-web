
export class Availability {
    public start: Date;
    public end: Date
    public lodgingTypeId: number;
    public available?: number;
    public availableModifier?: number;

    public constructor(init?: Partial<Availability>) {
        Object.assign(this, init);
    }
}