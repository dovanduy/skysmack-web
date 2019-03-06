import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { Lodging } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesRequests extends NgRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGING_TYPES_', ['types']);
    }
}
