import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { PackagesType } from '@skysmack/ng-core';

export class PackagesPackageManifest extends PackagesType implements PackageManifest {
    public icon = 'apps';
    public menuLocation = 'docker';
    public modulePath = './../../../../../../libs/portal-packages/src/lib/packages#PackagesModule';
}

export function loadPackagesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PackagesPackageManifest());
}
