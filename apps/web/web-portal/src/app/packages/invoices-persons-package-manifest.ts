import { InvoicesType, InvoicesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class InvoicesPersonsPackageManifest extends InvoicesType implements PackageManifest {
    public static modulePath = './../packages/modules/invoices_persons_wrapper.module#InvoicesPersonsWrapperModule';
    public icon = '';
    public menuLocation = '';
    public modulePath = InvoicesPersonsPackageManifest.modulePath;
}

export function loadInvoicesPersonsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesPersonsPackageManifest());
}

export const invoicesPersonsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesTypeId, loadChildren: InvoicesPersonsPackageManifest.modulePath } as Route;
