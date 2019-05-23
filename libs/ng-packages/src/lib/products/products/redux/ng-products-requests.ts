import { Product, PRODUCTS_REDUX_KEY, PRODUCTS_ADDITIONAL_PATHS } from '@skysmack/packages-products';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgProductsRequests extends NgRecordRequests<Product, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PRODUCTS_REDUX_KEY, PRODUCTS_ADDITIONAL_PATHS);
    }
}
