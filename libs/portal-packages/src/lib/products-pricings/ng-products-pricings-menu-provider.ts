import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ProductsPricingsPermissions } from '@skysmack/packages-products-pricings';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ProductsPricingsTypeId, ProductsTypeId } from '@skysmack/package-types';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';
import { ProductsIndexComponent } from '../products/products/components/products-index/products-index.component';
import { ProductPriceChangesIndexComponent } from './product-price-changes/components/product-price-changes-index/product-price-changes-index.component';
import { ProductTypePriceChangesIndexComponent } from './product-type-price-changes/components/product-type-price-changes-index/product-type-price-changes-index.component';
import { ProductTypeSalesPriceIndexComponent } from './product-type-sales-price/components/product-type-sales-price-index/product-type-sales-price-index.component';
import { ProductsSalesPriceIndexComponent } from './products-sales-price/components/products-sales-price-index/products-sales-price-index.component';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public ProductsPricingsTranslationPrefix = 'PRODUCTS_PRICINGS.INDEX.';
    public ProductPriceChangesTranslationPrefix = 'PRODUCT_PRICE_CHANGES.INDEX.';
    public ProductTypePriceChangesTranslationPrefix = 'PRODUCT_TYPE_PRICE_CHANGES.INDEX.';
    public ProductsSalesPriceTranslationPrefix = 'PRODUCTS_SALES_PRICE.INDEX.';
    public ProductTypeSalesPriceTranslationPrefix = 'PRODUCT_TYPE_SALES_PRICE.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductsPricingsIndexComponent.COMPONENT_KEY, this.getProductsPricingsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductPriceChangesIndexComponent.COMPONENT_KEY, this.getProductPriceChangesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductTypePriceChangesIndexComponent.COMPONENT_KEY, this.getProductTypePriceChangesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductsSalesPriceIndexComponent.COMPONENT_KEY, this.getProductsSalesPriceMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ProductsPricingsTypeId, componentKey, ProductTypeSalesPriceIndexComponent.COMPONENT_KEY, this.getProductTypeSalesPriceMenuAreas, this.store)
            
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(packagePath,ProductsPricingsTypeId,componentKey, ProductsPricingsIndexComponent.COMPONENT_KEY, this.getProductsPricingsMenuItems, this.store),
            getConnectedPackageMenuEntries(packagePath, ProductsPricingsTypeId, ProductsTypeId, componentKey, ProductsIndexComponent.COMPONENT_KEY, this.store),
            getMenuEntries<MenuItem>(packagePath, ProductsPricingsTypeId, componentKey, ProductPriceChangesIndexComponent.COMPONENT_KEY, this.getProductPriceChangesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ProductsPricingsTypeId, componentKey, ProductTypePriceChangesIndexComponent.COMPONENT_KEY, this.getProductTypePriceChangesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ProductsPricingsTypeId, componentKey, ProductsSalesPriceIndexComponent.COMPONENT_KEY, this.getProductsSalesPriceMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ProductsPricingsTypeId, componentKey, ProductTypeSalesPriceIndexComponent.COMPONENT_KEY, this.getProductTypeSalesPriceMenuItems, this.store)
        );
    };

    private getProductsPricingsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ProductsPricingsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getProductsPricingsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'price-changes',
                displayName: this.ProductsPricingsTranslationPrefix + 'PRICE_CHANGES',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'types/price-changes',
                displayName: this.ProductsPricingsTranslationPrefix + 'PRICE_TYPE_CHANGES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductTypePriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'sales-prices',
                displayName: this.ProductsPricingsTranslationPrefix + 'SALES_PRICES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductSalesPrices
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'types/sales-prices',
                displayName: this.ProductsPricingsTranslationPrefix + 'SALES_PRICES_TYPES',
                area: 'manage',
                order: 4,
                icon: 'group_add',
                permissions: [
                    ProductsPricingsPermissions.findProductTypeSalesPrices
                ],
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };

    
    
    public getProductPriceChangesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.ProductPriceChangesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ProductPriceChangesTranslationPrefix,
                order: 2
            })
        ];
    };

    public getProductPriceChangesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.ProductPriceChangesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/price-changes/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPricingsPermissions.addProductPriceChanges
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };



      public getProductTypePriceChangesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.ProductTypePriceChangesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ProductTypePriceChangesTranslationPrefix,
                order: 2
            })
        ];
    };

    public getProductTypePriceChangesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.ProductTypePriceChangesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/types/price-changes/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPricingsPermissions.addProductTypePriceChanges
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };



    public getProductsSalesPriceMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.ProductsSalesPriceTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ProductsSalesPriceTranslationPrefix,
                order: 2
            })
        ];
    };

    public getProductsSalesPriceMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.ProductsSalesPriceTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/sales-prices/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPricingsPermissions.addProductSalesPrices
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };



    public getProductTypeSalesPriceMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.ProductTypeSalesPriceTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ProductTypeSalesPriceTranslationPrefix,
                order: 2
            })
        ];
    };

    public getProductTypeSalesPriceMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.ProductTypeSalesPriceTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/types/sales-prices/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    ProductsPricingsPermissions.addProductTypeSalesPrices
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}