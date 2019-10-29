import { PhonesType, PhonesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class PhonesPackageManifest extends PhonesType implements PackageManifest {
    public static modulePath = './../packages/modules/phones_wrapper.module#PhonesWrapperModule';
    public icon = 'phone_enabled';
    public menuLocation = 'main';
    public modulePath = PhonesPackageManifest.modulePath;
}

export function loadPhonePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new PhonesPackageManifest());
}

export const phonesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + PhonesTypeId, loadChildren: PhonesPackageManifest.modulePath } as Route;