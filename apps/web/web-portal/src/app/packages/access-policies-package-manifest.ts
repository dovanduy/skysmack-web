import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { AccessPoliciesType } from '@skysmack/packages-skysmack-core';

export class AccessPoliciesPackageManifest extends AccessPoliciesType implements PackageManifest {
    public static modulePath = './../packages/modules/access_policies_wrapper.module#AccessPoliciesWrapperModule';
    public icon = 'security';
    public menuLocation = 'docker';
    public modulePath = AccessPoliciesPackageManifest.modulePath;
}

export function loadAccessPoliciesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new AccessPoliciesPackageManifest());
}

export const accessPoliciesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + AccessPoliciesType.id, loadChildren: AccessPoliciesPackageManifest.modulePath } as Route;