import { LodgingsType, LodgingsTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';


export class LodgingsPackageManifest extends LodgingsType implements PackageManifest {
    public static modulePath = './../packages/modules/lodgings_wrapper.module#LodgingsWrapperModule';
    public icon = 'domain';
    public menuLocation = 'main';
    public modulePath = LodgingsPackageManifest.modulePath;
}

export function loadLodgingPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingsPackageManifest());
}

export const lodgingsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + LodgingsTypeId, loadChildren: LodgingsPackageManifest.modulePath } as Route;