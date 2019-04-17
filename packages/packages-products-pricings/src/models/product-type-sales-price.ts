import { SalesPrice } from './sales-price';
import { LocalObject } from '@skysmack/framework';
import { ProductType } from '../../../packages-products';

export class ProductTypeSalesPrice extends SalesPrice {

    public productTypeId: number;
    public productType: LocalObject<ProductType, number>;
}