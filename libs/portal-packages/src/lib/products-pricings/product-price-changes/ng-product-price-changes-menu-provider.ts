import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton, getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings';
import { ProductsPricingsTypeId } from '@skysmack/package-types';
import { ProductPriceChangesIndexComponent } from './components/product-price-changes-index/product-price-changes-index.component';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PRODUCT_PRICE_CHANGES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductPriceChangesIndexComponent.COMPONENT_KEY, this.getProductPriceChangesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ProductsPricingsTypeId, componentKey, ProductPriceChangesIndexComponent.COMPONENT_KEY, this.getProductPriceChangesMenuItems, this.store);
    };

    public getProductPriceChangesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getProductPriceChangesMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPricingsPermissions.addProductPriceChanges
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            setBackButtonV2('product-pricing')
        ];
    };
}