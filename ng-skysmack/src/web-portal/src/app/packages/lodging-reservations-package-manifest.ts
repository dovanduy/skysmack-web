import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class LodgingReservationsPackageManifest extends LodgingReservationsType implements PackageManifest {
    public icon = 'style';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/lodging_reservations_wrapper.module#LodgingReservationsWrapperModule';
}

export function loadLodgingReservationPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingReservationsPackageManifest());
}
