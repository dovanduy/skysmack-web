import { WebhooksType, WebhooksTypeId } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class WebhooksPackageManifest extends WebhooksType implements PackageManifest {
    public static modulePath = './../packages/modules/webhooks_wrapper.module#WebhooksWrapperModule';
    public icon = 'settings_input_component';
    public menuLocation = 'main';
    public modulePath = WebhooksPackageManifest.modulePath;
}

export function loadWebhooksPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new WebhooksPackageManifest());
}

export const webhooksRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + WebhooksTypeId, loadChildren: WebhooksPackageManifest.modulePath } as Route;