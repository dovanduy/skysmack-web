import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { PackagesType } from '@skysmack/ng-packages';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';

export class PackagesPackageManifest extends PackagesType implements PackageManifest {
    public static modulePath = './../packages/modules/packages_wrapper.module#PackagesWrapperModule';
    public icon = 'apps';
    public menuLocation = 'docker';
    public modulePath = PackagesPackageManifest.modulePath;
}

export function loadPackagesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PackagesPackageManifest());
}

export const packagesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + PackagesPackageManifest.id, loadChildren: PackagesPackageManifest.modulePath } as Route;