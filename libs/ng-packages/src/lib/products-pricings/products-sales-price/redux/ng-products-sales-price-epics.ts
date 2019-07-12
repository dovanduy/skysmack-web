import { RecordEpicsBase } from '@skysmack/ng-framework';
import { ProductsSalesPrice, PRODUCTS_SALES_PRICE_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductsSalesPriceRequests } from './ng-products-sales-price-requests';
import { NgProductsSalesPriceNotifications } from '../ng-products-sales-price-notifications';
import { NgProductsStore } from '../../../products/products/redux/ng-products-store';
import { NgProductsActions } from '../../../products/products/redux/ng-products-actions';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceEpics extends RecordEpicsBase<ProductsSalesPrice, number> {
    constructor(
        protected requests: NgProductsSalesPriceRequests,
        protected notifications: NgProductsSalesPriceNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected productsStore: NgProductsStore,
        protected productsActions: NgProductsActions
    ) {
        super(requests, PRODUCTS_SALES_PRICE_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PRODUCTS_SALES_PRICE_REDUX_KEY,
                relationIdSelector: 'recordId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.productsStore,
                actions: this.productsActions,
                dependencyIndexes: [0]
            })
        ]);
    }
}
