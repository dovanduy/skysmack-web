import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries } from '@skysmack/ng-framework';
import { InvoicesPermissions } from '@skysmack/packages-invoices';
import { ProductsPermissions } from '@skysmack/packages-products';
import { ProductsTypeId } from '@skysmack/package-types';
import { ProductsIndexComponent } from './components/products-index/products-index.component';

@Injectable({ providedIn: 'root' })
export class NgProductsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PRODUCTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ProductsTypeId, componentKey, ProductsIndexComponent.COMPONENT_KEY, this.getProductsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ProductsTypeId, componentKey, ProductsIndexComponent.COMPONENT_KEY, this.getProductsMenuItems, this.store);
    };

    public getProductsMenuAreas = () => {
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

    public getProductsMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPermissions.addProducts
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            new MenuItem({
                url: 'types',
                displayName: this.translationPrefix + 'TYPES',
                area: 'manage',
                order: 1,
                icon: 'description',
                permissions: [
                    ProductsPermissions.findProductTypes
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    ProductsPermissions.findProductsFields
                ],
                providedIn: ['sidebar']
            })
        ];
    };
}