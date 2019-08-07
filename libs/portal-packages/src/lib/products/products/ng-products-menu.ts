import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { PRODUCTS_AREA_KEY, ProductsPermissions } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductsMenu extends SidebarMenu {
    public menuId = PRODUCTS_AREA_KEY;
    public translationPrefix = 'PRODUCTS.INDEX.';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders
    ) {
        super(redux, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2,
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ProductsPermissions.addProducts
                ]
            }),
            new MenuItem({
                url: 'types',
                displayName: this.translationPrefix + 'TYPES',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                    ProductsPermissions.findProductTypes
                ]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    ProductsPermissions.findProductsFields
                ]
            })
        ]);
    }

    public setSpeedDialMenu() {
        this.addToSpeedDialMenuItems(new MenuItem({
            url: 'create',
            displayName: this.translationPrefix + 'CREATE',
            area: undefined,
            order: 1,
            icon: 'add',
            permissions: [
                ProductsPermissions.addProducts
            ]
        }));
    }
}
