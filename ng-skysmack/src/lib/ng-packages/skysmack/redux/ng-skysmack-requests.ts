import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkysmackRequests, CurrentTenantViewModel, SkysmackActions, GetCurrentTenantSuccessAction } from '@skysmack/packages-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRequests implements SkysmackRequests {
    protected prefix: 'skysmack';
    constructor(protected http: HttpClient) { }

    public get(): Observable<GetCurrentTenantSuccessAction> {
        // TODO: Get url via api-domain injectable.
        return this.http.get<CurrentTenantViewModel>('http://client1.skysmack-io.test:2000/tenant', { observe: 'response' }).pipe(
            map(response => Object.assign({}, new GetCurrentTenantSuccessAction({
                type: SkysmackActions.GET_CURRENT_TENANT_SUCCESS,
                payload: response.body
            })))
        );
    }
}
