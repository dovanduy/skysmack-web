import { PriceChange } from './price-change';
import { LocalObject } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';

export class ProductTypePriceChange extends PriceChange {
    public productTypeId: number;
    public productType: LocalObject<ProductType, number>;
}
