import { PersonsLodgingReservationsType } from '@skysmack/packages-persons-lodging-reservations';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class PersonsLodgingReservationsPackageManifest extends PersonsLodgingReservationsType implements PackageManifest {
    public icon = 'style';
    public menuLocation = '';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.PersonsLodgingReservationsModule);
}

export function loadPersonsLodgingReservationsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsLodgingReservationsPackageManifest());
}
