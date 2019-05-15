import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class ReservationsPricingsPackageManifest extends ReservationsPricingsType implements PackageManifest {
    public icon = 'timeline';
    public menuLocation = '';
    public modulePath = './../packages/modules/reservations_pricings_wrapper.module#ReservationsPricingsWrapperModule';
}

export function loadReservationsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ReservationsPricingsPackageManifest());
}
