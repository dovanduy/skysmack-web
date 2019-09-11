export class LodgingReservationsSettings {
    public earliestCheckIn: number;
    public latestCheckOut: number;
    public checkIn: string;
    public checkOut: string;

    constructor(values: Partial<LodgingReservationsSettings>) {
        Object.assign(this, values);
    }
}