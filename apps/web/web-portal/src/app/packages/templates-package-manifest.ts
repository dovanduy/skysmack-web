import { TemplatesType, TemplatesTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class TemplatesPackageManifest extends TemplatesType implements PackageManifest {
    public static modulePath = './../packages/modules/templates_wrapper.module#TemplatesWrapperModule';
    public icon = 'perm_media';
    public menuLocation = 'main';
    public modulePath = TemplatesPackageManifest.modulePath;
}

export function loadTemplatePackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new TemplatesPackageManifest());
}

export const templatesRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + TemplatesTypeId, loadChildren: TemplatesPackageManifest.modulePath } as Route;