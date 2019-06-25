import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { InvoicesCashPaymentsType } from '@skysmack/packages-invoices-cash-payments';

export class InvoicesCashPaymentsPackageManifest extends InvoicesCashPaymentsType implements PackageManifest {
    public icon = 'attach_money';
    public menuLocation = '';
    public modulePath = './../packages/modules/invoices_cash_payments_wrapper.module#InvoicesCashPaymentsWrapperModule'
}

export function loadInvoicesCashPaymentsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesCashPaymentsPackageManifest());
}
