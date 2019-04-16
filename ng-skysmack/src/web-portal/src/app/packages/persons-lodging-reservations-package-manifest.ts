import { PersonsLodgingReservationsType } from '@skysmack/packages-persons-lodging-reservations';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class PersonsLodgingReservationsPackageManifest extends PersonsLodgingReservationsType implements PackageManifest {
    public icon = 'style';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/persons_lodging_reservations_wrapper.module#PersonsLodgingReservationsWrapperModule';
}

export function loadPersonsLodgingReservationsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsLodgingReservationsPackageManifest());
}
