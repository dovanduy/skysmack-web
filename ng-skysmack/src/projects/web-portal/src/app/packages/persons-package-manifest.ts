import { PersonsType } from '@skysmack/packages-persons';
import { PackageManifest } from './../../../../../lib/portal-ui/models/package-manifest';
import { PackageLoader } from './../../../../../lib/ng-packages/packages/package-loader';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = '../../../../../lib/portal-packages/persons/persons.module#PersonsModule';
}

export function loadPersonPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsPackageManifest());
}