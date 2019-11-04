import { SiteMinderType, SiteMinderTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class SiteMinderPackageManifest extends SiteMinderType implements PackageManifest {
    public static modulePath = './../packages/modules/siteminder_wrapper.module#SiteMinderWrapperModule';
    public icon = 'cloud_circle';
    public menuLocation = 'main';
    public modulePath = SiteMinderPackageManifest.modulePath;
}

export function loadSiteMinderPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new SiteMinderPackageManifest());
}

export const siteminderRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + SiteMinderTypeId, loadChildren: SiteMinderPackageManifest.modulePath } as Route;