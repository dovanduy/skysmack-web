import { DoorwaysPassCodesType, DoorwaysPassCodesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class DoorwaysPassCodesPackageManifest extends DoorwaysPassCodesType implements PackageManifest {
    public static modulePath = './../packages/modules/doorways_pass_codes_wrapper.module#DoorwaysPassCodesWrapperModule';
    public icon = '';
    public menuLocation = '';
    public modulePath = DoorwaysPassCodesPackageManifest.modulePath;
}

export function loadDoorwaysPassCodesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new DoorwaysPassCodesPackageManifest());
}

export const doorwaysPassCodesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + DoorwaysPassCodesTypeId, loadChildren: DoorwaysPassCodesPackageManifest.modulePath } as Route;