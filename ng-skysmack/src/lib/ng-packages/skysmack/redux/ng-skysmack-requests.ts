import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkysmackRequests, Skysmack, SkysmackActions, GetSkysmackSuccessAction } from '@skysmack/packages-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiDomain } from '@skysmack/framework';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRequests implements SkysmackRequests {
    protected prefix: 'skysmack';
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') private apiDomain: ApiDomain
    ) { }

    public get(): Observable<GetSkysmackSuccessAction> {
        return this.http.get<Skysmack>(this.apiDomain.domain + '/skysmack', { observe: 'response' }).pipe(
            map(response => Object.assign({}, new GetSkysmackSuccessAction({
                type: SkysmackActions.GET_SKYSMACK_SUCCESS,
                payload: response.body
            })))
        );
    }
}
