import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { NgRecordRequests } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceRequests extends NgRecordRequests<ProductsSalesPrice, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'PRODUCTS_SALES_PRICES_', []);
    }
}
