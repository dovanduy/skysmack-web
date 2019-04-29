import { AllocatedPrice } from '@skysmack/pricings';
import { LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';

export class LodgingTypeAllocatedPrice extends AllocatedPrice {
    public record: LocalObject<LodgingType, number>;
}
