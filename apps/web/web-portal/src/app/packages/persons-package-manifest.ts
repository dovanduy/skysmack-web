import { PersonsType } from '@skysmack/packages-persons';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    public static modulePath = './../packages/modules/persons_wrapper.module#PersonsWrapperModule';
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = PersonsPackageManifest.modulePath;
}

export function loadPersonPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsPackageManifest());
}

export const personsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + PersonsPackageManifest.id, loadChildren: PersonsPackageManifest.modulePath } as Route;