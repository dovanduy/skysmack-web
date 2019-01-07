import { PersonsType } from '@skysmack/packages-persons';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/persons_wrapper.module#PersonsWrapperModule';
}

export function loadPersonPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsPackageManifest());
}
