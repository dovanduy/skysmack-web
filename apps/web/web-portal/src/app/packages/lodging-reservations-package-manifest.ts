import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';
import { Route } from '@angular/router';

export class LodgingReservationsPackageManifest extends LodgingReservationsType implements PackageManifest {
    public static modulePath = './../packages/modules/lodging_reservations_wrapper.module#LodgingReservationsWrapperModule'
    public icon = 'style';
    public menuLocation = '';
    public modulePath = LodgingReservationsPackageManifest.modulePath;
}

export function loadLodgingReservationPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingReservationsPackageManifest());
}

export const lodgingReservationsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + LodgingReservationsPackageManifest.id, loadChildren: LodgingReservationsPackageManifest.modulePath } as Route;