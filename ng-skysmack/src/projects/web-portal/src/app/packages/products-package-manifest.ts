// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { ProductsModule } from '../../../../../lib/portal-packages/products/products.module';

import { ProductsType } from '@skysmack/packages-products';
import { PackageManifest } from '../../../../../lib/portal-ui/models/package-manifest';
import { PackageLoader } from 'lib/ng-packages/skysmack/packages/package-loader';

export class ProductsPackageManifest extends ProductsType implements PackageManifest {
    public icon = 'folder';
    public menuLocation = 'main';
    public modulePath = '../../../../../lib/portal-packages/products/products.module#ProductsModule';
}

export function loadProductPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPackageManifest());
}
