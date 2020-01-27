import { LodgingsDoorwaysType, LodgingsDoorwaysTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class LodgingsDoorwaysPackageManifest extends LodgingsDoorwaysType implements PackageManifest {
    public static modulePath = './../packages/modules/lodgings_doorways_wrapper.module#LodgingsDoorwaysWrapperModule'
    public icon = '';
    public menuLocation = '';
    public modulePath = LodgingsDoorwaysPackageManifest.modulePath;
}

export function loadLodgingsDoorwaysPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new LodgingsDoorwaysPackageManifest());
}

export const lodgingsDoorwaysRoute = { path: `${TenantPackageLoadStrategy.URL_PREFIX}${LodgingsDoorwaysTypeId}`, loadChildren: LodgingsDoorwaysPackageManifest.modulePath, data: { type: LodgingsDoorwaysTypeId } } as Route;