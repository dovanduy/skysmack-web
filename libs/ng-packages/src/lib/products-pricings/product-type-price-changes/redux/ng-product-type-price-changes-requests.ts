import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { ProductTypePriceChange, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, PRODUCT_TYPE_PRICE_CHANGES_ADDITIONAL_PATHS } from '@skysmack/packages-products-pricings';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesRequests extends NgRecordRequests<ProductTypePriceChange, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, PRODUCT_TYPE_PRICE_CHANGES_ADDITIONAL_PATHS);
    }
}
