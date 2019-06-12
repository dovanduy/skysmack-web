import { ProductsPricingsType } from '@skysmack/packages-products-pricings';
import { PackageLoader, PackageManifest } from '@skysmack/ng-framework';

export class ProductsPricingsPackageManifest extends ProductsPricingsType implements PackageManifest {
    public icon = 'euro_symbol';
    public menuLocation = '';
    public modulePath = () => import('@skysmack/portal-packages').then(m => m.ProductsPricingsModule);
}

export function loadProductsPricingsPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new ProductsPricingsPackageManifest());
}
