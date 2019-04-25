import { Record, LocalObject } from "@skysmack/framework";
import { Stay } from './stay';
import { LodgingType, Lodging } from '@skysmack/packages-lodgings';

export class LodgingReservation extends Record<number> {
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;

    public allocatedLodgingId?: number;
    public allocatedLodging: LocalObject<Lodging, number>;

    public checkIn: Date;
    public checkOut: Date;
    public stays: Stay[];
    public persons: number;
    public status: 'processing' | 'reserved' | 'inStay' | 'checkedOut' | 'noShow' | 'cancelled';
    public static statusEnum = {
        Processing: 'processing',
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
