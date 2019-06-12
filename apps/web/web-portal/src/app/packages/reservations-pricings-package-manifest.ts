import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class ReservationsPricingsPackageManifest extends ReservationsPricingsType implements PackageManifest {
    public icon = 'timeline';
    public menuLocation = '';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.ReservationsPricingsModule);
}

export function loadReservationsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ReservationsPricingsPackageManifest());
}
