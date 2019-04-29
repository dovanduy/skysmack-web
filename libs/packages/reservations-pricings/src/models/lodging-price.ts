import { SalesPrice } from '@skysmack/pricings';
import { Lodging } from '@skysmack/packages-lodgings';
import { LocalObject } from '@skysmack/framework';

export class LodgingPrice extends SalesPrice {
    public record: LocalObject<Lodging, number>;
}
