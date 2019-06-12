import { PersonsType } from '@skysmack/packages-persons';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.PersonsModule);
    // public modulePath = './../packages/modules/persons_wrapper.module#PersonsWrapperModule';
}

export function loadPersonPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PersonsPackageManifest());
}
