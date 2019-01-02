import { Product } from '@skysmack/packages-products';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from 'lib/ng-redux/requests/ng-document-record-requests';

@Injectable({ providedIn: 'root' })
export class NgProductsRequests extends NgDocmentRecordRequests<Product, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'PRODUCTS_', []);
    }
}
