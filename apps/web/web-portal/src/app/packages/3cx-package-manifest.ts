import { PBX_3CXType, PBX_3CXTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class PBX_3CXPackageManifest extends PBX_3CXType implements PackageManifest {
    public static modulePath = './../packages/modules/3cx_wrapper.module#PBX_3CXWrapperModule';
    public icon = 'settings_phone';
    public menuLocation = 'main';
    public modulePath = PBX_3CXPackageManifest.modulePath;
}

export function load3CXPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PBX_3CXPackageManifest());
}

export const PBX_3CXRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + PBX_3CXTypeId, loadChildren: PBX_3CXPackageManifest.modulePath } as Route;