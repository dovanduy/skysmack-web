import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductPriceChange, PRODUCT_PRICE_CHANGES_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductPriceChangesRequests } from './ng-product-price-changes-requests';
import { NgProductPriceChangesNotifications } from '../ng-product-price-changes-notifications';
import { NgProductsSalesPriceActions } from '../../products-sales-price/redux/ng-products-sales-price-actions';
import { NgProductsSalesPriceStore } from '../../products-sales-price/redux/ng-products-sales-price-store';
import { getReadDependencies } from '@skysmack/ng-redux';
import { NgProductTypePriceChangesActions } from '../../product-type-price-changes/redux/ng-product-type-price-changes-actions';
import { NgProductTypePriceChangesStore } from '../../product-type-price-changes/redux/ng-product-type-price-changes-store';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesEpics extends RecordEpicsBase<ProductPriceChange, number> {
    constructor(
        protected requests: NgProductPriceChangesRequests,
        protected notifications: NgProductPriceChangesNotifications,
        protected productSalesPriceStore: NgProductsSalesPriceStore,
        protected productSalesPriceActions: NgProductsSalesPriceActions,
        protected productTypePriceChangeStore: NgProductTypePriceChangesStore,
        protected productTypePriceChangeActions: NgProductTypePriceChangesActions,
        protected skysmackStore: NgSkysmackStore
    ) {
        super(requests, PRODUCT_PRICE_CHANGES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PRODUCT_PRICE_CHANGES_REDUX_KEY,
                relationIdSelector: 'productSalesPriceId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.productSalesPriceStore,
                actions: this.productSalesPriceActions
            }),
            ...getReadDependencies({
                prefix: PRODUCT_PRICE_CHANGES_REDUX_KEY,
                relationIdSelector: 'productTypePriceChangeId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.productTypePriceChangeStore,
                actions: this.productTypePriceChangeActions
            })
        ]);
    }
}
