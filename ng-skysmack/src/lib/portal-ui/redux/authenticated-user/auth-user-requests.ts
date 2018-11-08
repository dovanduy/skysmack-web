import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDomain } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class AuthUserRequests {

    constructor(
        public http: HttpClient,
        @Inject('ApiDomain') private apiDomain: ApiDomain
    ) { }

    // TODO: Replace any with OpenIdConnectResponse when available
    public login(grantType?: string, username?: string, password?: string): Observable<any> {
        const params = new HttpParams()
            .append('grant_type', grantType)
            .append('username', username)
            .append('password', password);

        const url = `${this.apiDomain.domain}/oauth2/password`;
        return this.http.post<any>(url, params);
    }
}
