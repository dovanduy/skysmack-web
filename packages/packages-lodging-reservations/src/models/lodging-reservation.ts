import { Record } from "@skysmack/framework";
import { Stay } from './stay';

export class LodgingReservation extends Record<number> {
    public id: number;
    public lodgingTypeId: number;
    public allocatedLodgingId?: number;
    public checkIn: Date;
    public checkOut: Date;
    public stays: Stay[];
    public persons: number;
    public status: 'reserved' | 'inStay' | 'checkedOut' | 'noShow' | 'cancelled';
    public static statusEnum = {
        Reserved: 'reserved',
        InStay: 'inStay',
        CheckedOut: 'checkedOut',
        NoShow: 'noShow',
        Cancelled: 'cancelled'
    }

    public constructor(init?: Partial<LodgingReservation>) {
        super();
        Object.assign(this, init);
    }
}
