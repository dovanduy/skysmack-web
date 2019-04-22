import { InvoicesType } from '@skysmack/packages-invoices';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class InvoicesPackageManifest extends InvoicesType implements PackageManifest {
    public icon = 'receipt';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/invoices_wrapper.module#InvoicesWrapperModule';
}

export function loadInvoicePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesPackageManifest());
}
