import { MaintenanceType } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class MaintenancePackageManifest extends MaintenanceType implements PackageManifest {
    public static modulePath = './../packages/modules/maintenance_wrapper.module#MaintenanceWrapperModule';
    public icon = 'build';
    public menuLocation = 'main';
    public modulePath = MaintenancePackageManifest.modulePath;
}

export function loadMaintenancePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new MaintenancePackageManifest());
}

export const maintenanceRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + MaintenancePackageManifest.id, loadChildren: MaintenancePackageManifest.modulePath } as Route;