import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocumentRecordRequests } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesRequests extends NgDocumentRecordRequests<ProductType, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'PRODUCT_TYPES_', ['types']);
    }
}
