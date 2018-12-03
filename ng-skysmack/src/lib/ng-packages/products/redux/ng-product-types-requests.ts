import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from 'lib/ng-redux/requests/ng-document-record-requests';
import { ProductType } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesRequests extends NgDocmentRecordRequests<ProductType, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'PRODUCT_TYPES_', ['types']);
    }
}
