import { LodgingReservationsSignaturesType, LodgingReservationsSignaturesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class LodgingReservationsSignaturesPackageManifest extends LodgingReservationsSignaturesType implements PackageManifest {
    public static modulePath = './../packages/modules/lodging_reservations_signatures_wrapper.module#LodgingReservationsSignaturesWrapperModule'
    public icon = 'gesture';
    public menuLocation = 'main';
    public modulePath = LodgingReservationsSignaturesPackageManifest.modulePath;
}

export function loadLodgingReservationsSignaturesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingReservationsSignaturesPackageManifest());
}

export const lodgingReservationsSignaturesRoute = { path: `${TenantPackageLoadStrategy.URL_PREFIX}${LodgingReservationsSignaturesTypeId}`, loadChildren: LodgingReservationsSignaturesPackageManifest.modulePath, data: { type: LodgingReservationsSignaturesTypeId } } as Route;