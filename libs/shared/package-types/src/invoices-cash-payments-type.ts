import { PackageType } from '@skysmack/framework';
import { InvoicesTypeId } from './invoices-type';

export const InvoicesCashPaymentsTypeId = '7416b55f-4436-4f64-8ae2-7581ea686a1b';

export class InvoicesCashPaymentsType implements PackageType {
  id = InvoicesCashPaymentsTypeId;
  dependencies = [InvoicesTypeId];
}
