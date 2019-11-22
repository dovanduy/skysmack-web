import { Injectable, Inject } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tenant } from '../models/tenant';
import { PartnerTenant } from '../models/partner-tenant';

@Injectable({ providedIn: 'root' })
export class CommercialTenantsService {

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }


    public get(): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.get(`${this.apiDomain.domain}/tenants`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public getById(id: string): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.get(`${this.apiDomain.domain}/tenants/${id}`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public add(record: Tenant): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post(`${this.apiDomain.domain}/tenants`, [record], { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public relateTenantAndUser(record: PartnerTenant): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post<PartnerTenant[]>(`${this.apiDomain.domain}/identity/users/tenants`, [record], { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }


    public update(record: Tenant): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.put(`${this.apiDomain.domain}/tenants`, [record], { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public delete(id: string): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.delete<Tenant>(`${this.apiDomain.domain}/tenants/${id}`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
}
