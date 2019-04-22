import { SalesPrice } from './sales-price';
import { LocalObject } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';

export class ProductTypeSalesPrice extends SalesPrice {

    public productTypeId: number;
    public productType: LocalObject<ProductType, number>;
}
