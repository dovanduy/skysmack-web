import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { InvoicesProductsType } from '@skysmack/packages-invoices-products';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';
import { Route } from '@angular/router';

export class InvoicesProductsPackageManifest extends InvoicesProductsType implements PackageManifest {
    public static modulePath = './../packages/modules/invoices_products_wrapper.module#InvoicesProductsWrapperModule';
    public icon = 'monetization_on';
    public menuLocation = '';
    public modulePath = InvoicesProductsPackageManifest.modulePath
}

export function loadInvoicesProductsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesProductsPackageManifest());
}

export const invoicesProductsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesProductsPackageManifest.id, loadChildren: InvoicesProductsPackageManifest.modulePath } as Route;