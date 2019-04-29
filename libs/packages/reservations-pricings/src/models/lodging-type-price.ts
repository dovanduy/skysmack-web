import { SalesPrice } from '@skysmack/pricings';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject } from '@skysmack/framework';

export class LodgingTypePrice extends SalesPrice {
    public record: LocalObject<LodgingType, number>;
}
