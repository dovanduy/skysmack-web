import { Basket } from '@skysmack/packages-baskets';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocumentRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgBasketsRequests extends NgDocumentRecordRequests<Basket, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'BASKETS_', []);
    }
}