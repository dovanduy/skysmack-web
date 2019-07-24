import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { OpenApiType, OpenApiTypeId } from '@skysmack/package-types';

export class OpenApiPackageManifest extends OpenApiType implements PackageManifest {
    public static modulePath = './../packages/modules/open_api_wrapper.module#OpenApiWrapperModule';
    public icon = 'code';
    public menuLocation = 'main';
    public modulePath = OpenApiPackageManifest.modulePath;
}

export function loadOpenApiPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new OpenApiPackageManifest());
}

export const openApiRoute = { path: `${TenantPackageLoadStrategy.URL_PREFIX}${OpenApiTypeId}`, loadChildren: OpenApiPackageManifest.modulePath, data: { loadOnOpen: true } } as Route;