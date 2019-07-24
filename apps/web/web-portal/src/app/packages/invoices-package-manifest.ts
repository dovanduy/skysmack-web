import { InvoicesType, InvoicesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class InvoicesPackageManifest extends InvoicesType implements PackageManifest {
    public static modulePath = './../packages/modules/invoices_wrapper.module#InvoicesWrapperModule';
    public icon = 'receipt';
    public menuLocation = 'main';
    public modulePath = InvoicesPackageManifest.modulePath;
}

export function loadInvoicePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesPackageManifest());
}

export const invoicesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesTypeId, loadChildren: InvoicesPackageManifest.modulePath } as Route;
