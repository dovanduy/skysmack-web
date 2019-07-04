import { IdentitiesType } from '@skysmack/packages-identities';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class IdentitiesPackageManifest extends IdentitiesType implements PackageManifest {
    public static modulePath = './../packages/modules/identities_wrapper.module#IdentitiesWrapperModule';
    public icon = 'perm_identity';
    public menuLocation = 'main';
    public modulePath = IdentitiesPackageManifest.modulePath;
}

export function loadIdentitiesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new IdentitiesPackageManifest());
}

export const identitiesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + IdentitiesPackageManifest.id, loadChildren: IdentitiesPackageManifest.modulePath } as Route;