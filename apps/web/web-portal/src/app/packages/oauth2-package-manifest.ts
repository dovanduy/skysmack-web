import { Oauth2Type } from '@skysmack/packages-oauth2';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';

export class Oauth2PackageManifest extends Oauth2Type implements PackageManifest {
    public static modulePath = './../packages/modules/oauth2_wrapper.module#OAuth2WrapperModule'
    public icon = 'lock';
    public menuLocation = '';
    public modulePath = Oauth2PackageManifest.modulePath;
}

export function loadOauth2Package(packageLoader: PackageLoader) {
    return () => packageLoader.add(new Oauth2PackageManifest());
}

export const OAuth2Route = { path: TenantPackageLoadStrategy.URL_PREFIX + Oauth2PackageManifest.id, loadChildren: Oauth2PackageManifest.modulePath } as Route;