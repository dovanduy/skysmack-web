import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { ProductTypeSalesPrice, PRODUCT_TYPE_SALES_PRICE_ADDITIONAL_PATHS, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordRequests } from '@skysmack/ng-framework';


@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceRequests extends NgRecordRequests<ProductTypeSalesPrice, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY, PRODUCT_TYPE_SALES_PRICE_ADDITIONAL_PATHS);
    }
}
