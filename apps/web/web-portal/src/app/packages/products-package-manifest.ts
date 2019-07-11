import { ProductsType } from '@skysmack/package-types';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';
import { Route } from '@angular/router';
import { TenantPackageLoadStrategy } from '../start/tenant-package-load-strategy';

export class ProductsPackageManifest extends ProductsType implements PackageManifest {
    public static modulePath = './../packages/modules/products_wrapper.module#ProductsWrapperModule';
    public icon = 'folder';
    public menuLocation = 'main';
    public modulePath = ProductsPackageManifest.modulePath;
}

export function loadProductPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPackageManifest());
}

export const productsRoute = { path: TenantPackageLoadStrategy.URL_PREFIX + ProductsPackageManifest.id, loadChildren: ProductsPackageManifest.modulePath } as Route;