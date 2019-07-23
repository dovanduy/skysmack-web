import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ProductsPermissions } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesMenu extends SidebarMenu {
    public menuId = 'Product-types';
    public translationPrefix = 'PRODUCT_TYPES.INDEX.';

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
                icon: 'groupAdd',
                permissions: [
                    ProductsPermissions.addProductTypes
                ]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'shortText',
                permissions: [
                    ProductsPermissions.findProductTypeFields
                ]
            })
        ]);

        this.setBackButton();
    }

    public setSpeedDialMenu() {
        this.addToSpeedDialMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPermissions.addProductTypes
                ]
            })
        ]);
    }
}
