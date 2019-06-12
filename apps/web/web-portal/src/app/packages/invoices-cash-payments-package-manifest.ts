import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { InvoicesCashPaymentsType } from '@skysmack/packages-invoices-cash-payments';

export class InvoicesCashPaymentsPackageManifest extends InvoicesCashPaymentsType implements PackageManifest {
    public icon = 'attach_money';
    public menuLocation = '';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.InvoicesCashPaymentsModule);
}

export function loadInvoicesCashPaymentsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesCashPaymentsPackageManifest());
}
