import { InvoicesType } from '@skysmack/packages-invoices';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class InvoicesPackageManifest extends InvoicesType implements PackageManifest {
    public icon = 'receipt';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.InvoicesModule);
}

export function loadInvoicePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesPackageManifest());
}
