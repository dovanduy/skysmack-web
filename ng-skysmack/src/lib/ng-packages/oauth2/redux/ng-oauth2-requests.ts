import { ApiDomain } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { Oauth2Requests } from '@skysmack/packages-oauth2';
import { Injectable, Inject } from '@angular/core';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgOauth2Requests implements Oauth2Requests {

    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) { }

    login(action: ReduxAction<{ email: string, password: string, path: string }>): Observable<ReduxAction> {
        throw new Error('Method not implemented.');
    }
}
