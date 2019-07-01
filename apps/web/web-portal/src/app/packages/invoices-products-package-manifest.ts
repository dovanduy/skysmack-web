import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { InvoicesProductsType } from '@skysmack/packages-invoices-products';

export class InvoicesProductsPackageManifest extends InvoicesProductsType implements PackageManifest {
    public icon = 'monetization_on';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/invoices_products_wrapper.module#InvoicesProductsWrapperModule'
}

export function loadInvoicesProductsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesProductsPackageManifest());
}
