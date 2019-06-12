import { ProductsType } from '@skysmack/packages-products';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class ProductsPackageManifest extends ProductsType implements PackageManifest {
    public icon = 'folder';
    public menuLocation = 'main';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.ProductsModule);
}

export function loadProductPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPackageManifest());
}
