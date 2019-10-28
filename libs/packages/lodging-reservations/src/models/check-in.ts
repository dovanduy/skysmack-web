import { Record } from '@skysmack/framework';
import { LodgingReservation } from './lodging-reservation';

export class CheckIn extends Record<number> {
    public reservationId: number;
    public reservation: LodgingReservation;
    public lodgingId?: number;
    [key: string]: any | any;

    public constructor(init?: Partial<CheckIn>) {
        super();
        Object.assign(this, init);
    }
}