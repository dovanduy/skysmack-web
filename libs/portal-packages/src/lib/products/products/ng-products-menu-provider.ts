import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ProductsPermissions } from '@skysmack/packages-products';
import { ProductsTypeId } from '@skysmack/package-types';
import { ProductsIndexComponent } from './components/products-index/products-index.component';
import { ProductTypesIndexComponent } from '../product-types/components/product-types-index/product-types-index.component';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NgProductsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private productsTranslationPrefix = 'PRODUCTS.INDEX.';
    private productTypeTranslationPrefix = 'PRODUCT_TYPES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, ProductsTypeId, componentKey, ProductsIndexComponent.COMPONENT_KEY, this.getProductsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ProductsTypeId, componentKey, ProductTypesIndexComponent.COMPONENT_KEY, this.getProductTypesMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, ProductsTypeId, componentKey, ProductsIndexComponent.COMPONENT_KEY, this.getProductsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ProductsTypeId, componentKey, ProductTypesIndexComponent.COMPONENT_KEY, this.getProductTypesMenuItems, this.store)
        );
    };

    private getProductsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.productsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.productsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getProductsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.productsTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPermissions.addProducts
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'types',
                displayName: this.productsTranslationPrefix + 'TYPES',
                area: 'manage',
                hotkeyOptions: {
                    keyCode: 84,
                    shiftKey: true,
                    action: `/${packagePath}/types`
                },
                order: 1,
                icon: 'description',
                permissions: [
                    ProductsPermissions.findProductTypes
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.productsTranslationPrefix + 'FIELDS',
                area: 'manage',
                hotkeyOptions: {
                    keyCode: 70,
                    shiftKey: true,
                    action: `/${packagePath}/fields`
                },
                order: 2,
                icon: 'short_text',
                permissions: [
                    ProductsPermissions.findProductsFields
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };



    private getProductTypesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.productTypeTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.productTypeTranslationPrefix,
                order: 2
            })
        ];
    };

    private getProductTypesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.productTypeTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/types/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPermissions.addProductTypes
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.productTypeTranslationPrefix + 'FIELDS',
                area: 'manage',
                hotkeyOptions: {
                    keyCode: 70,
                    shiftKey: true,
                    action: `/${packagePath}/types/fields`
                },
                order: 1,
                icon: 'short_text',
                permissions: [
                    ProductsPermissions.findProductTypeFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };
}