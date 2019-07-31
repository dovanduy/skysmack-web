import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { ProductPriceChange, PRODUCT_PRICE_CHANGES_REDUX_KEY, PRODUCT_PRICE_CHANGES_ADDITIONAL_PATHS } from '@skysmack/packages-products-pricings';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesRequests extends NgRecordRequests<ProductPriceChange, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PRODUCT_PRICE_CHANGES_REDUX_KEY, PRODUCT_PRICE_CHANGES_ADDITIONAL_PATHS);
    }
}
