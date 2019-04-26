import { PriceChange } from '@skysmack/pricings';
import { LocalObject } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';

export class ProductTypePriceChange extends PriceChange {
    public productType: LocalObject<ProductType, number>;
}
