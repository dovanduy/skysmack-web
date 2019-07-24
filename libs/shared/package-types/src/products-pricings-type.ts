import { PackageType } from '@skysmack/framework';
import { ProductsTypeId } from './products-type';

export const ProductsPricingsTypeId = 'ef1e9fb1-e079-4909-991e-6265ee4d1a9d';

export class ProductsPricingsType implements PackageType {
    public id = ProductsPricingsTypeId;
    dependencies = [ProductsTypeId];
}
