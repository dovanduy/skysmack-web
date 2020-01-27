import { LocalObject, DocumentRecord } from "@skysmack/framework";
import { Stay } from './stay';
import { LodgingType, Lodging } from '@skysmack/packages-lodgings';
import { GroupReservation } from './group-reservation';

export class LodgingReservation extends DocumentRecord<number> {
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;

    public lodgingId?: number;
    public lodging: LocalObject<Lodging, number>;

    public groupId?: number;
    public group: LocalObject<GroupReservation, number>;

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
