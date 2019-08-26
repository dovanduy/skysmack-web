import { Injectable, Inject } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Database } from '../models/database';

@Injectable({ providedIn: 'root' })
export class CommercialDatabasesService {

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }


    public get(): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.get<Database[]>(`${this.apiDomain.domain}/databases`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public delete(databaseName: string): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.delete<Database>(`${this.apiDomain.domain}/databases/${databaseName}`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
}
