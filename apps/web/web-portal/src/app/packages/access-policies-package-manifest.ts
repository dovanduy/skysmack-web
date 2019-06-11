import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { PackagesType, AccessPoliciesType } from '@skysmack/ng-core';

export class AccessPoliciesPackageManifest extends AccessPoliciesType implements PackageManifest {
    public icon = 'security';
    public menuLocation = 'docker';
    public modulePath = './../packages/modules/access_policies_wrapper.module#AccessPoliciesWrapperModule';
}

export function loadAccessPoliciesPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new AccessPoliciesPackageManifest());
}
