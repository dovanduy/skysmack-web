import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from 'lib/ng-redux/requests/ng-document-record-requests';
import { Lodging } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodingTypesRequests extends NgDocmentRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGING_TYPES_', ['types']);
    }
}
