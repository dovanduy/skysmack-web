import { CorsType, CorsTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class CorsPackageManifest extends CorsType implements PackageManifest {
    public static modulePath = './../packages/modules/cors_wrapper.module#CorsWrapperModule';
    public icon = 'call_split';
    public menuLocation = 'main';
    public modulePath = CorsPackageManifest.modulePath;
}

export function loadCorsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new CorsPackageManifest());
}

export const corsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + CorsTypeId, loadChildren: CorsPackageManifest.modulePath } as Route;