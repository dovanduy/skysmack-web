import { PackageType } from '@skysmack/framework';

export const ProductsTypeId = 'ab77bcdc-b144-44cc-af10-df8532ef167e';

export class ProductsType implements PackageType {
  id = ProductsTypeId;
  dependencies = [];
}
