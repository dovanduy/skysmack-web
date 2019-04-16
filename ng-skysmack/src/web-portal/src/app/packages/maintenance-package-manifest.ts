import { MaintenanceType } from '@skysmack/packages-maintenance';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class MaintenancePackageManifest extends MaintenanceType implements PackageManifest {
    public icon = 'build';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/maintenance_wrapper.module#MaintenanceWrapperModule';
}

export function loadMaintenancePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new MaintenancePackageManifest());
}
