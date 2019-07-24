import { PackageType } from '@skysmack/framework';

export const InvoicesTypeId = '0e485267-6282-4e45-87f7-157de421d30b';

export class InvoicesType implements PackageType {
  id = InvoicesTypeId;
  dependencies = [];
}
