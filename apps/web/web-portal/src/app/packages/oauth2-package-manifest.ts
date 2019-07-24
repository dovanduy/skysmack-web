import { OAuth2Type, OAuth2TypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';

export class OAuth2PackageManifest extends OAuth2Type implements PackageManifest {
    public static modulePath = './../packages/modules/oauth2_wrapper.module#OAuth2WrapperModule'
    public icon = 'lock';
    public menuLocation = '';
    public modulePath = OAuth2PackageManifest.modulePath;
}

export function loadOauth2Package(packageLoader: PackageLoader) {
    return () => packageLoader.add(new OAuth2PackageManifest());
}

export const OAuth2Route = { path: TenantPackageLoadStrategy.URL_PREFIX + OAuth2TypeId, loadChildren: OAuth2PackageManifest.modulePath } as Route;