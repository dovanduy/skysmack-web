import { ProductsPricingsType } from '@skysmack/packages-products-pricings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';
import { Route } from '@angular/router';

export class ProductsPricingsPackageManifest extends ProductsPricingsType implements PackageManifest {
    public static modulePath = './../packages/modules/products_pricings_wrapper.module#ProductsPricingsWrapperModule';
    public icon = 'euro_symbol';
    public menuLocation = '';
    public modulePath = ProductsPricingsPackageManifest.modulePath;
}

export function loadProductsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPricingsPackageManifest());
}

export const productsPricingsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + ProductsPricingsPackageManifest.id, loadChildren: ProductsPricingsPackageManifest.modulePath } as Route;