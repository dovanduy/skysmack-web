import { MaintenanceType } from '@skysmack/packages-maintenance';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class MaintenancePackageManifest extends MaintenanceType implements PackageManifest {
    public icon = 'face';
    public menuLocation = 'main';
    public modulePath = '../../../../../dist/portal-packages/src/maintenance/maintenance.module#MaintenanceModule';
}

export function loadMaintenancePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new MaintenancePackageManifest());
}
