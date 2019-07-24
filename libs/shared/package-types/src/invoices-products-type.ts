import { PackageType } from '@skysmack/framework';
import { InvoicesTypeId } from './invoices-type';
import { ProductsTypeId } from './products-type';

export const InvoicesProductsTypeId = 'bc9cdc2b-78ad-4713-8c56-a964a13c8946';

export class InvoicesProductsType implements PackageType {
  id = InvoicesProductsTypeId;
  dependencies = [InvoicesTypeId, ProductsTypeId];
}
