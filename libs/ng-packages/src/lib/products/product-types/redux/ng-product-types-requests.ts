import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { ProductType, PRODUCT_TYPES_REDUX_KEY, PRODUCT_TYPES_ADDITIONAL_PATHS } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesRequests extends NgRecordRequests<ProductType, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PRODUCT_TYPES_REDUX_KEY, PRODUCT_TYPES_ADDITIONAL_PATHS);
    }
}
