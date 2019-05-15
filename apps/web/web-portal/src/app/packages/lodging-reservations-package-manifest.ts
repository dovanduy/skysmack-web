import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class LodgingReservationsPackageManifest extends LodgingReservationsType implements PackageManifest {
    public icon = 'style';
    public menuLocation = '';
    public modulePath = './../packages/modules/lodging_reservations_wrapper.module#LodgingReservationsWrapperModule';
}

export function loadLodgingReservationPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingReservationsPackageManifest());
}
