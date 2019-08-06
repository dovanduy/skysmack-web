import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton } from '@skysmack/ng-framework';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PRODUCTS_SALES_PRICE.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
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
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'products-sales-price-index') {
            return of([
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                        ProductsPricingsPermissions.addProductSalesPrices
                    ],
                    providedIn: ['sidebar', 'speedDial']
                })
            ]).pipe(setBackButton({ customPath: '/product-pricing' }));
        } else {
           return of([]);
        }
    };
}