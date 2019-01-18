export class CheckIn {
    public reservationId: number;
    public lodgingId?: number;

    public constructor(init?: Partial<CheckIn>) {
        Object.assign(this, init);
    }
}