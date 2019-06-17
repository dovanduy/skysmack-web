import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { EmailsSmtpType } from '@skysmack/packages/emails-smtp';

export class EmailsSmtpPackageManifest extends EmailsSmtpType implements PackageManifest {
    public icon = 'email';
    public menuLocation = '';
    public modulePath = './../packages/modules/emails_smtp_wrapper.module#EmailsSmtpWrapperModule';
}

export function loadEmailsSmtpPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new EmailsSmtpPackageManifest());
}
