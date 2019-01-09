import { MaintenanceType } from '@skysmack/packages-maintenance';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class MaintenancePackageManifest extends MaintenanceType implements PackageManifest {
    public icon = 'build';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/maintenance_wrapper.module#MaintenanceWrapperModule';
}

export function loadMaintenancePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new MaintenancePackageManifest());
}
