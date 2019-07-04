import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';

export class ReservationsPricingsPackageManifest extends ReservationsPricingsType implements PackageManifest {
    public static modulePath = './../packages/modules/reservations_pricings_wrapper.module#ReservationsPricingsWrapperModule';
    public icon = 'timeline';
    public menuLocation = '';
    public modulePath = ReservationsPricingsPackageManifest.modulePath;
}

export function loadReservationsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ReservationsPricingsPackageManifest());
}

export const reservationsPricingsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + ReservationsPricingsPackageManifest.id, loadChildren: ReservationsPricingsPackageManifest.modulePath } as Route;