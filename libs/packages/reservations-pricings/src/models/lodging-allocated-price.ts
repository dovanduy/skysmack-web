import { AllocatedPrice } from '@skysmack/pricings';
import { LocalObject } from '@skysmack/framework';
import { Lodging } from '@skysmack/packages-lodgings';

export class LodgingAllocatedPrice extends AllocatedPrice {
    public record: LocalObject<Lodging, number>;
}
