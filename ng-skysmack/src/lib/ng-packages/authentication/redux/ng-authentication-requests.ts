import { ApiDomain } from '@skysmack/framework';
import { ReduxAction, } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export abstract class NgAuthenticationRequests {

    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain,
        protected prefix: string
    ) { }

    public login(action: ReduxAction<{ email: string, password: string, path: string }>): Observable<ReduxAction> {
        const url = `${this.apiDomain.domain}/replace-me`;

        return this.http.get<any>(url, { observe: 'response' })
            .pipe(
                map(() => new ReduxAction<any>()), // TODO: Write request stuff
                catchError(() => of(Object.assign({}, new ReduxAction({
                    error: true
                }))))
            );
    }
}