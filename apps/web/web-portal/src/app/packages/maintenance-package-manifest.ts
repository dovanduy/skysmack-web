import { MaintenanceType } from '@skysmack/packages-maintenance';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class MaintenancePackageManifest extends MaintenanceType implements PackageManifest {
    public icon = 'build';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.MaintenanceModule);
}

export function loadMaintenancePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new MaintenancePackageManifest());
}
