import { IdentitiesType } from '@skysmack/packages-identities';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class IdentitiesPackageManifest extends IdentitiesType implements PackageManifest {
    public icon = 'perm_identity';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/identities_wrapper.module#IdentitiesWrapperModule';
}

export function loadIdentitiesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new IdentitiesPackageManifest());
}
