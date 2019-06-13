import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { PackagesType } from '@skysmack/ng-core';

export class PackagesPackageManifest extends PackagesType implements PackageManifest {
    public icon = 'apps';
    public menuLocation = 'docker';
    public modulePath = './../packages/modules/packages_wrapper.module#PackagesWrapperModule';
}

export function loadPackagesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PackagesPackageManifest());
}
