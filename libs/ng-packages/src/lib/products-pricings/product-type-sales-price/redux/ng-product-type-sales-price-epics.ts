import { RecordEpicsBase } from '@skysmack/ng-framework';
import { ProductTypeSalesPrice, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductTypeSalesPriceRequests } from './ng-product-type-sales-price-requests';
import { NgProductTypeSalesPriceNotifications } from '../ng-product-type-sales-price-notifications';
import { NgProductTypesStore } from '../../../products/product-types/redux/ng-product-types-store';
import { NgProductTypesActions } from '../../../products/product-types/redux/ng-product-types-actions';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceEpics extends RecordEpicsBase<ProductTypeSalesPrice, number> {
    constructor(
        protected requests: NgProductTypeSalesPriceRequests,
        protected notifications: NgProductTypeSalesPriceNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected productTypesStore: NgProductTypesStore,
        protected productTypesActions: NgProductTypesActions

    ) {
        super(requests, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PRODUCT_TYPE_SALES_PRICE_REDUX_KEY,
                relationIdSelector: 'recordId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.productTypesStore,
                actions: this.productTypesActions,
                dependencyIndexes: [0]
            })
        ]);
    }
}
