import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkysmackRequests, CurrentTenantViewModel, SkysmackActions, GetCurrentTenantSuccessAction } from '@skysmack/packages-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiDomain } from 'projects/web-portal/src/requests/api-domain';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRequests implements SkysmackRequests {
    protected prefix: 'skysmack';
    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain
    ) { }

    public get(): Observable<GetCurrentTenantSuccessAction> {
        return this.http.get<CurrentTenantViewModel>(this.apiDomain.domain + '/tenant', { observe: 'response' }).pipe(
            map(response => Object.assign({}, new GetCurrentTenantSuccessAction({
                type: SkysmackActions.GET_CURRENT_TENANT_SUCCESS,
                payload: response.body
            })))
        );
    }
}
