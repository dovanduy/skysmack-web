import { IdentitiesType } from '@skysmack/packages-identities';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class IdentitiesPackageManifest extends IdentitiesType implements PackageManifest {
    public icon = 'perm_identity';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/identities_wrapper.module#IdentitiesWrapperModule';
}

export function loadIdentitiesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new IdentitiesPackageManifest());
}
