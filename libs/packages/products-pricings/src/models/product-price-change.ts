import { PriceChange } from './price-change';
import { LocalObject } from '@skysmack/framework';
import { ProductsSalesPrice } from './products-sales-price';
import { ProductTypePriceChange } from './product-type-price-change';

export class ProductPriceChange extends PriceChange {

    public productSalesPriceId: number;
    public productSalesPrice: LocalObject<ProductsSalesPrice, number>;

    public productTypePriceChangeId: number;
    public productTypePriceChange: LocalObject<ProductTypePriceChange, number>;
}
