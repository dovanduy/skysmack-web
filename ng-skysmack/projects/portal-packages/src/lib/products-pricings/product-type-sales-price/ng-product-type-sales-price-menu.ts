import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';
import { PRODUCT_TYPE_SALES_PRICE_AREA_KEY } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceMenu extends SidebarMenu {
    public menuId = PRODUCT_TYPE_SALES_PRICE_AREA_KEY;
    public translationPrefix = 'PRODUCT_TYPE_SALES_PRICE.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem({
            url: 'create',
            displayName: this.translationPrefix + 'CREATE',
            area: 'actions',
            order: 1,
            icon: 'groupAdd',
        }));
        this.setBackButton();
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
            }),
        ];
    }
}
