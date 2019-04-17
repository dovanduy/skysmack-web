import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Product, PRODUCTS_REDUX_KEY } from '@skysmack/packages-products';
import { NgProductsRequests } from './ng-products-requests';
import { Injectable } from '@angular/core';
import { NgProductsNotifications } from '../ng-products-notifications';
import { NgSkysmackStore } from '../../../skysmack-core/skysmack/redux/ng-skysmack-store';
import { getReadDependencies } from '@skysmack/ng-redux';
import { NgProductTypesStore } from '../../../products/product-types/redux/ng-product-types-store';
import { NgProductTypesActions } from '../../product-types/redux/ng-product-types-actions';

@Injectable({ providedIn: 'root' })
export class NgProductsEpics extends RecordEpicsBase<Product, number> {
    constructor(
        protected requests: NgProductsRequests, 
        protected notifications: NgProductsNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected productTypesStore: NgProductTypesStore,
        protected productTypesActions: NgProductTypesActions
        ) {
        super(requests, PRODUCTS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PRODUCTS_REDUX_KEY,
                relationIdSelector: 'productTypeId',
                relationSelector: 'productType',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.productTypesStore,
                actions: this.productTypesActions
            })
        ]);
    }
}
