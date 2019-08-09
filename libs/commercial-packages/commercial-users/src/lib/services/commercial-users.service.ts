import { Injectable, Inject } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartnerUser } from '../models/partner-user';

@Injectable({ providedIn: 'root' })
export class CommercialUsersService {

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }


    public get(): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.get<PartnerUser[]>(`${this.apiDomain.domain}/identity/users`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public getById(id: string): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.get<PartnerUser[]>(`${this.apiDomain.domain}/identity/users/${id}`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public add(record: PartnerUser): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post<PartnerUser[]>(`${this.apiDomain.domain}/identity/users`, [record], { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public update(record: PartnerUser): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.put<PartnerUser[]>(`${this.apiDomain.domain}/identity/users`, [record], { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
}
