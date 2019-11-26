import { Injectable, Inject } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../models/commercial-available-package';

@Injectable({ providedIn: 'root' })
export class CommercialPackagesService {

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }


    public getAvailablePackages(): Observable<HttpSuccessResponse<CommercialAvailablePackage> | HttpErrorResponse> {
        return this.http.get(`${this.apiDomain.domain}/packages`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
}
