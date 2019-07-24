import { PackageType } from '@skysmack/framework';
import { InvoicesTypeId } from './invoices-type';

export const TerminalPaymentsTypeId = '51da6074-7d5f-4a98-b6ad-497894a7bdd3';

export class TerminalPaymentsType implements PackageType {
  id = TerminalPaymentsTypeId;
  dependencies = [InvoicesTypeId];
}
