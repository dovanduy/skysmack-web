import { EmailsType } from '@skysmack/packages-emails';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/TenantPackageLoadStrategy';
import { Route } from '@angular/router';

export class EmailsPackageManifest extends EmailsType implements PackageManifest {
    public static modulePath = './../packages/modules/emails_wrapper.module#EmailsWrapperModule';
    public icon = 'email';
    public menuLocation = 'main';
    public modulePath = EmailsPackageManifest.modulePath;
}

export function loadEmailsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new EmailsPackageManifest());
}

export const emailsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + EmailsPackageManifest.id, loadChildren: EmailsPackageManifest.modulePath } as Route;