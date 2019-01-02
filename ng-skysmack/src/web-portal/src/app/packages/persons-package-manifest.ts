// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { PersonsModule } from './../../../../../projects/portal-packages/src/lib/persons/persons.module';

import { PersonsType } from '@skysmack/packages-persons';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = './../../../../../projects/portal-packages/src/lib/persons/persons.module#PersonsModule';
}

export function loadPersonPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsPackageManifest());
}
