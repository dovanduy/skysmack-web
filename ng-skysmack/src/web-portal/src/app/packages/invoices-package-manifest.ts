import { InvoicesType } from '@skysmack/packages-invoices';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class InvoicesPackageManifest extends InvoicesType implements PackageManifest {
    public icon = 'receipt';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/invoices_wrapper.module#InvoicesWrapperModule';
}

export function loadInvoicePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesPackageManifest());
}
