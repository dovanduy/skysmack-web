import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { EmailsSmtpType, EmailsSmtpTypeId } from '@skysmack/package-types';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
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

export const emailsSmtpRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + EmailsSmtpTypeId, loadChildren: EmailsSmtpPackageManifest.modulePath } as Route;