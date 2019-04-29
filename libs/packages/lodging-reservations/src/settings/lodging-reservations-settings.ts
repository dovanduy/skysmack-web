export class LodgingReservationsSettings {
    public earliestCheckIn: number;
    public latestCheckOut: number;
    constructor(values: Partial<LodgingReservationsSettings>) {
        Object.assign(this, values);
    }
}