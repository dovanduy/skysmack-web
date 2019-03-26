import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';
import { ProductsPricingsType } from '@skysmack/packages-products-pricings';

export class ProductsPricingsPackageManifest extends ProductsPricingsType implements PackageManifest {
    public icon = 'euro_symbol';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/products_pricings_wrapper.module#ProductsPricingsWrapperModule';
}

export function loadProductsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPricingsPackageManifest());
}
