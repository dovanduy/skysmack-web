import { Record } from '@skysmack/framework';
import { LodgingReservation } from './lodging-reservation';

export class Move extends Record<number> {
    public reservationId: number;
    public reservation: LodgingReservation;
    public lodgingId?: number;

    constructor(init?: Partial<Move>) {
        super(init);
        Object.assign(this, init);
    }
}