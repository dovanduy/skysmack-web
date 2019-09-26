import { Injectable, Inject } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartnerUser } from '../models/partner-user';
import { PartnerRole } from '../models/partner-role';
import { PartnerUserRole } from '../models/partner-user-role';

@Injectable({ providedIn: 'root' })
export class CommercialUsersService {

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }


    public get(): Observable<HttpSuccessResponse<PartnerUser[]> | HttpErrorResponse> {
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

    public delete(id: string): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.delete<PartnerUser>(`${this.apiDomain.domain}/identity/users/${id}`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    //#region Roles
    public getRoles(): Observable<HttpSuccessResponse<PartnerRole[]> | HttpErrorResponse> {
        return this.http.get<PartnerUser[]>(`${this.apiDomain.domain}/identity/roles`, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public addRoleToUser(partnerUserRole: PartnerUserRole): Observable<HttpSuccessResponse | HttpErrorResponse> {
        const dictionary = {};
        dictionary[partnerUserRole.userId] = [partnerUserRole.roleId];
        return this.http.post<any>(`${this.apiDomain.domain}/identity/users/roles/add`, dictionary, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public removeRoleFromUser(partnerUserRole: PartnerUserRole): Observable<HttpSuccessResponse | HttpErrorResponse> {
        const dictionary = {};
        dictionary[partnerUserRole.userId] = [partnerUserRole.roleId];
        return this.http.post<any>(`${this.apiDomain.domain}/identity/users/roles/remove`, dictionary, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
    //#endregion
}
