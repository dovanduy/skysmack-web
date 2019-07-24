import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { InvoicesProductsType, InvoicesProductsTypeId } from '@skysmack/package-types';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
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

export const invoicesProductsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesProductsTypeId, loadChildren: InvoicesProductsPackageManifest.modulePath } as Route;