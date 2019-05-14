import { ReservationPriceChange } from '@skysmack/pricings';
import { LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';

export class LodgingTypeAllocatedPrice extends ReservationPriceChange {
    public record: LocalObject<LodgingType, number>;
}
