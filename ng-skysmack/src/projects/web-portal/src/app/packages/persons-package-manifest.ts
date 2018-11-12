import { PersonsType } from '@skysmack/packages-persons';
import { PackageManifest } from './../../../../../lib/portal-ui/models/package-manifest';
import { PackageLoader } from './../../../../../lib/ng-packages/packages/package-loader';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    public static modulePath = '../../../../../lib/portal-packages/persons/persons.module#PersonsModule';
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = PersonsPackageManifest.modulePath;
}

export function loadPersonPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsPackageManifest());
}