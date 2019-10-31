import { Record } from '@skysmack/framework';
import { LodgingReservation } from './lodging-reservation';

export class Checkout extends Record<number> {
    public reservationId: number;
    public reservation: LodgingReservation;
    public lodgingId?: number;

    constructor(init?: Partial<Checkout>) {
        super();
        Object.assign(this, init);
    }
}