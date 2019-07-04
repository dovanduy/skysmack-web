import { InvoicesType } from '@skysmack/packages-invoices';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';
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

export const invoicesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesPackageManifest.id, loadChildren: InvoicesPackageManifest.modulePath } as Route;
