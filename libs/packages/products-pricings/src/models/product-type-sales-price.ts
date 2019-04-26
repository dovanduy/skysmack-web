import { SalesPrice } from '@skysmack/pricings';
import { LocalObject } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';

export class ProductTypeSalesPrice extends SalesPrice {
    public productType: LocalObject<ProductType, number>;
}
