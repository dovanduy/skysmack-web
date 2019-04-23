import { ProductsPricingsType } from '@skysmack/packages-products-pricings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-redux';

export class ProductsPricingsPackageManifest extends ProductsPricingsType implements PackageManifest {
    public icon = 'euro_symbol';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/products_pricings_wrapper.module#ProductsPricingsWrapperModule';
}

export function loadProductsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPricingsPackageManifest());
}