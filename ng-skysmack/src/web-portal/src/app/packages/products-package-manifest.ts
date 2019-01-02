// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { ProductsModule } from '../../../../../projects/portal-packages/src/lib/products/products.module';

import { ProductsType } from '@skysmack/packages-products';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class ProductsPackageManifest extends ProductsType implements PackageManifest {
    public icon = 'folder';
    public menuLocation = 'main';
    public modulePath = '../../../../../lib/portal-packages/products/products.module#ProductsModule';
}

export function loadProductPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPackageManifest());
}
