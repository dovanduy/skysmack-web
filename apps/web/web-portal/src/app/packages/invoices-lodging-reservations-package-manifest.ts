import { InvoicesLodgingReservationsType, InvoicesLodgingReservationsTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class InvoicesLodgingReservationsPackageManifest extends InvoicesLodgingReservationsType implements PackageManifest {
    public static modulePath = './../packages/modules/invoices_lodging_reservations_wrapper.module#InvoicesLodgingReservationsWrapperModule';
    public icon = 'style';
    public menuLocation = '';
    public modulePath = InvoicesLodgingReservationsPackageManifest.modulePath;
}

export function loadInvoicesLodgingReservationsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new InvoicesLodgingReservationsPackageManifest());
}

export const invoicesLodgingReservationsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + InvoicesLodgingReservationsTypeId, loadChildren: InvoicesLodgingReservationsPackageManifest.modulePath } as Route;