import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ProductsPermissions } from '@skysmack/packages-products';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ProductsTypeId } from '@skysmack/package-types';
import { ProductTypesIndexComponent } from './components/product-types-index/product-types-index.component';

@Injectable({ providedIn: 'root' })
export class NgProductTypesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PRODUCT_TYPES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ProductsTypeId, componentKey, ProductTypesIndexComponent.COMPONENT_KEY, this.getProductTypesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ProductsTypeId, componentKey, ProductTypesIndexComponent.COMPONENT_KEY, this.getProductTypesMenuItems, this.store);
    };

    public getProductTypesMenuAreas = () => {
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

    public getProductTypesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPermissions.addProductTypes
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 1,
                icon: 'short_text',
                permissions: [
                    ProductsPermissions.findProductTypeFields
                ],
                providedIn: ['sidebar']
            }),
            setBackButton(packagePath)
        ];
    };
}