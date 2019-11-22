import { PassCodesType, PassCodesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class PassCodesPackageManifest extends PassCodesType implements PackageManifest {
    public static modulePath = './../packages/modules/pass_codes_wrapper.module#PassCodesWrapperModule';
    public icon = 'vpn_key';
    public menuLocation = 'main';
    public modulePath = PassCodesPackageManifest.modulePath;
}

export function loadPassCodePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PassCodesPackageManifest());
}

export const passCodesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + PassCodesTypeId, loadChildren: PassCodesPackageManifest.modulePath } as Route;