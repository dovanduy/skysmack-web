export class DetailedLodgingType {
    public lodgingType: LocalObject<LodgingType, number>;
    public availableCount: number;

    public constructor(values?: Partial<DetailedLodgingType>) {
        Object.assign(this, values);
    }
}
