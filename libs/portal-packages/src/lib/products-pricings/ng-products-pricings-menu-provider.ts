import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PRODUCTS_PRICINGS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'products-pricings-index') {
            return of([
                new MenuItem({
                    url: 'price-changes',
                    displayName: this.translationPrefix + 'PRICE_CHANGES',
                    area: 'manage',
                    order: 1,
                    icon: 'groupAdd',
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
                    icon: 'groupAdd',
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
                    icon: 'groupAdd',
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
                    icon: 'groupAdd',
                    permissions: [
                        ProductsPricingsPermissions.findProductTypeSalesPrices
                    ],
                    providedIn: ['sidebar']
                }),
            ]);
        } else {
           return of([]);
        }
    };
}