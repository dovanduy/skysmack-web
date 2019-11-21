import { CORS_REDUX_KEY, CORS_ADDITIONAL_PATHS } from '@skysmack/packages-cors';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgCorsRequests {
    protected prefix: string = CORS_REDUX_KEY;
    protected additionalPaths: string[] = CORS_ADDITIONAL_PATHS;
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
    }
}
