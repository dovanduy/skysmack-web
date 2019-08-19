import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { ProductsPricingsTypeId, ProductsTypeId } from '@skysmack/package-types';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';
import { ProductsIndexComponent } from '../products/products/components/products-index/products-index.component';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'PRODUCTS_PRICINGS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath,
            ProductsPricingsTypeId,
            componentKey,
            ProductsPricingsIndexComponent.COMPONENT_KEY,
            this.getProductsPricingsMenuAreas,
            this.store
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(packagePath,
                ProductsPricingsTypeId,
                componentKey,
                ProductsPricingsIndexComponent.COMPONENT_KEY,
                this.getProductsPricingsMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                ProductsPricingsTypeId,
                ProductsTypeId,
                componentKey,
                ProductsIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    private getProductsPricingsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    private getProductsPricingsMenuItems = (packagePath: string): MenuItem[] => {
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
}