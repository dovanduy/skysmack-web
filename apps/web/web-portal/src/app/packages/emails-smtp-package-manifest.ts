import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { EmailsSmtpType } from '@skysmack/packages/emails-smtp';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';
import { Route } from '@angular/router';

export class EmailsSmtpPackageManifest extends EmailsSmtpType implements PackageManifest {
    public static modulePath = './../packages/modules/emails_smtp_wrapper.module#EmailsSmtpWrapperModule';
    public icon = 'email';
    public menuLocation = '';
    public modulePath = EmailsSmtpPackageManifest.modulePath;
}

export function loadEmailsSmtpPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new EmailsSmtpPackageManifest());
}

export const emailsSmtpRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + EmailsSmtpPackageManifest.id, loadChildren: EmailsSmtpPackageManifest.modulePath } as Route;