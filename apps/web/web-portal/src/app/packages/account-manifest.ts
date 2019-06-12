import { AccountType } from '@skysmack/packages-account';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class AccountPackageManifest extends AccountType implements PackageManifest {
    public icon = 'account_box';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.AccountModule);
}

export function loadAccountPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new AccountPackageManifest());
}
