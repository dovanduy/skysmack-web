import { PackageType } from '@skysmack/framework';
import { ProductsType } from './products-type';

export class ProductsPricingsType implements PackageType {
    public static id = 'ef1e9fb1-e079-4909-991e-6265ee4d1a9d';
    public id = ProductsPricingsType.id;
    dependencies = [ProductsType.id];
}
