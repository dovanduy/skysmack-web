import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings'

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenu extends SidebarMenu {
    public menuId = 'productsPricings';
    public translationPrefix = 'PRODUCTS_PRICINGS.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders
    ) {
        super(store, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea({
            area: 'manage',
            translationPrefix: this.translationPrefix,
            order: 1,
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'price-changes',
            displayName: this.translationPrefix + 'PRICE_CHANGES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ProductsPricingsPermissions.findProductPriceChanges
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'types/price-changes',
            displayName: this.translationPrefix + 'PRICE_TYPE_CHANGES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ProductsPricingsPermissions.findProductTypePriceChanges
            ]
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'sales-prices',
            displayName: this.translationPrefix + 'SALES_PRICES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ProductsPricingsPermissions.findProductSalesPrices
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'types/sales-prices',
            displayName: this.translationPrefix + 'SALES_PRICES_TYPES',
            area: 'manage',
            order: 3,
            icon: 'shortText',
            permissions: [
                ProductsPricingsPermissions.findProductTypeSalesPrices
            ]
        }));

        this.setBackButton({ connectedPackage: true }).addConnectedPackageMenuArea();
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
        ];
    }
}
