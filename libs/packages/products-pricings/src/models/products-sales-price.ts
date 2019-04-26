import { SalesPrice } from '@skysmack/pricings';
import { Product } from '@skysmack/packages-products';
import { LocalObject } from '@skysmack/framework';

export class ProductsSalesPrice extends SalesPrice {

    public recordId: number;
    public product: LocalObject<Product, number>;
}
