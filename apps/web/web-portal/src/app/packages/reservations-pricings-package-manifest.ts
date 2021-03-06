import { ReservationsPricingsType, ReservationsPricingsTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';

export class ReservationsPricingsPackageManifest extends ReservationsPricingsType implements PackageManifest {
    public static modulePath = './../packages/modules/reservations_pricings_wrapper.module#ReservationsPricingsWrapperModule';
    public icon = 'timeline';
    public menuLocation = '';
    public modulePath = ReservationsPricingsPackageManifest.modulePath;
}

export function loadReservationsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ReservationsPricingsPackageManifest());
}

export const reservationsPricingsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + ReservationsPricingsTypeId, loadChildren: ReservationsPricingsPackageManifest.modulePath } as Route;