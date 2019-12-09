import { LodgingsReservationsPassCodesType, LodgingsReservationsPassCodesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class LodgingsReservationsPassCodePackageManifest extends LodgingsReservationsPassCodesType implements PackageManifest {
    public static modulePath = './../packages/modules/lodgings_reservations_pass_codes_wrapper.module#LodgingsReservationsPassCodesWrapperModule'
    public icon = '';
    public menuLocation = '';
    public modulePath = LodgingsReservationsPassCodePackageManifest.modulePath;
}

export function loadLodgingsReservationsPassCodePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingsReservationsPassCodePackageManifest());
}

export const lodgingsReservationsPassCodeRoute = { path: `${TenantPackageLoadStrategy.URL_PREFIX}${LodgingsReservationsPassCodesTypeId}`, loadChildren: LodgingsReservationsPassCodePackageManifest.modulePath, data: { type: LodgingsReservationsPassCodesTypeId } } as Route;