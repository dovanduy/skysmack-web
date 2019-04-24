import { AccountType } from '@skysmack/packages-account';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class AccountPackageManifest extends AccountType implements PackageManifest {
    public icon = 'account_box';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/account_wrapper.module#AccountWrapperModule';
}

export function loadAccountPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new AccountPackageManifest());
}
