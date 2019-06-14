import { EmailsType } from '@skysmack/packages-emails';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class EmailsPackageManifest extends EmailsType implements PackageManifest {
    public icon = 'email';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/emails_wrapper.module#EmailsWrapperModule';
}

export function loadEmailsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new EmailsPackageManifest());
}
