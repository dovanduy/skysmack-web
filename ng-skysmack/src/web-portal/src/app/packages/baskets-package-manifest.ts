import { BasketsType } from '@skysmack/packages-baskets';
import { PackageManifest } from '@skysmack/ng-ui';
import { PackageLoader } from '@skysmack/ng-packages';

export class BasketsPackageManifest extends BasketsType implements PackageManifest {
    public icon = 'shopping_basket';
    public menuLocation = 'main';
    public modulePath = './../packages/modules/baskets_wrapper.module#BasketsWrapperModule';
}

export function loadBasketPackage(packageLoader: PackageLoader) {
    return () => packageLoader.add(new BasketsPackageManifest());
}
