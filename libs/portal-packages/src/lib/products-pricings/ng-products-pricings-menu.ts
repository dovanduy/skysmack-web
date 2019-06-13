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
                ProductsPricingsPermissions.findProductPriceChanges,
                ProductsPricingsPermissions.addProductPriceChanges,
                ProductsPricingsPermissions.updateProductPriceChanges,
                ProductsPricingsPermissions.removeProductPriceChanges
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'types/price-changes',
            displayName: this.translationPrefix + 'PRICE_TYPE_CHANGES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ProductsPricingsPermissions.findProductTypePriceChanges,
                ProductsPricingsPermissions.addProductTypePriceChanges,
                ProductsPricingsPermissions.updateProductTypePriceChanges,
                ProductsPricingsPermissions.removeProductTypePriceChanges
            ]
        }));
        
        this.primaryMenuItems.push(new MenuItem({
            url: 'sales-prices',
            displayName: this.translationPrefix + 'SALES_PRICES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ProductsPricingsPermissions.findProductSalesPrices,
                ProductsPricingsPermissions.addProductSalesPrices,
                ProductsPricingsPermissions.updateProductSalesPrices,
                ProductsPricingsPermissions.removeProductSalesPrices
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'types/sales-prices',
            displayName: this.translationPrefix + 'SALES_PRICES_TYPES',
            area: 'manage',
            order: 3,
            icon: 'shortText',
            permissions: [
                ProductsPricingsPermissions.findProductTypeSalesPrices,
                ProductsPricingsPermissions.addProductTypeSalesPrices,
                ProductsPricingsPermissions.updateProductTypeSalesPrices,
                ProductsPricingsPermissions.removeProductTypeSalesPrices
            ]
        }));

        this.setBackButton({ connectedPackage: true });
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
