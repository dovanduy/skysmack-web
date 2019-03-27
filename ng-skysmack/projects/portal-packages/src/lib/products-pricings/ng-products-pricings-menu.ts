import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenu extends SidebarMenu {
    public menuId = 'productsPricings';
    public translationPrefix = 'PRODUCTS_PRICINGS.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 1));
        this.primaryMenuItems.push(new MenuItem('sales-prices', this.translationPrefix + 'SALES_PRICES', 'manage', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('sales-prices/types', this.translationPrefix + 'SALES_PRICES_TYPES', 'manage', 3, 'shortText'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
