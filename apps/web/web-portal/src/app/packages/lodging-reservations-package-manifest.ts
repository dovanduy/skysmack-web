import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class LodgingReservationsPackageManifest extends LodgingReservationsType implements PackageManifest {
    public icon = 'style';
    public menuLocation = '';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.LodgingReservationsModule);
}

export function loadLodgingReservationPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingReservationsPackageManifest());
}
