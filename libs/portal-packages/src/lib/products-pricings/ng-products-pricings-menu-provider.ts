import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings';
import { getMenuEntries, setConnectedParentPackage } from '@skysmack/ng-framework';
import { ProductsPricingsTypeId } from '@skysmack/package-types';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PRODUCTS_PRICINGS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductsPricingsIndexComponent.COMPONENT_KEY, this.getProductsPricingsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ProductsPricingsTypeId, componentKey, ProductsPricingsIndexComponent.COMPONENT_KEY, this.getProductsPricingsMenuItems, this.store);
    };

    public getProductsPricingsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            }),
            this.getConnectedPackageMenuArea()
        ];
    };

    public getProductsPricingsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'price-changes',
                displayName: this.translationPrefix + 'PRICE_CHANGES',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductPriceChanges
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'types/price-changes',
                displayName: this.translationPrefix + 'PRICE_TYPE_CHANGES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductTypePriceChanges
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'sales-prices',
                displayName: this.translationPrefix + 'SALES_PRICES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductSalesPrices
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'types/sales-prices',
                displayName: this.translationPrefix + 'SALES_PRICES_TYPES',
                area: 'manage',
                order: 4,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductTypeSalesPrices
                ],
                providedIn: ['sidebar']
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
}