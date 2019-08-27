import { Person, FILE_STORAGE_REDUX_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageRequests extends NgRecordRequests<Person, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, FILE_STORAGE_REDUX_KEY, FILE_STORAGE_ADDITIONAL_PATHS);
    }
}
