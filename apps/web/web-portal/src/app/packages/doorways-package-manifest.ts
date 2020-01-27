import { DoorwaysType, DoorwaysTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class DoorwaysPackageManifest extends DoorwaysType implements PackageManifest {
    public static modulePath = './../packages/modules/doorways_wrapper.module#DoorwaysWrapperModule';
    public icon = 'meeting_room';
    public menuLocation = 'main';
    public modulePath = DoorwaysPackageManifest.modulePath;
}

export function loadDoorwayPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new DoorwaysPackageManifest());
}

export const doorwaysRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + DoorwaysTypeId, loadChildren: DoorwaysPackageManifest.modulePath } as Route;