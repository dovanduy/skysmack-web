import { PersonsLodgingReservationsType, PersonsLodgingReservationsTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class PersonsLodgingReservationsPackageManifest extends PersonsLodgingReservationsType implements PackageManifest {
    public static modulePath = './../packages/modules/persons_lodging_reservations_wrapper.module#PersonsLodgingReservationsWrapperModule';
    public icon = 'style';
    public menuLocation = '';
    public modulePath = PersonsLodgingReservationsPackageManifest.modulePath;
}

export function loadPersonsLodgingReservationsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsLodgingReservationsPackageManifest());
}

export const personsLodgingReservationsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + PersonsLodgingReservationsTypeId, loadChildren: PersonsLodgingReservationsPackageManifest.modulePath } as Route;