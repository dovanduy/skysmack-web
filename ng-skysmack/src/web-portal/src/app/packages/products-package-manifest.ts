import { ProductsType } from '@skysmack/packages-products';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class ProductsPackageManifest extends ProductsType implements PackageManifest {
    public icon = 'folder';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/products_wrapper.module#ProductsWrapperModule';
}

export function loadProductPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPackageManifest());
}
