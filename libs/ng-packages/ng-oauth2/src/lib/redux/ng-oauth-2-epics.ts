import { Injectable } from '@angular/core';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction, AuthenticationActions } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgAuthenticationActions } from '@skysmack/ng-framework';


@Injectable({ providedIn: 'root' })
export class NgOAuth2Epics {
    public epics: Epic[];

    constructor(
        private authenticationActions: NgAuthenticationActions
    ) {
        this.epics = [
            this.logoutOnRefreshTokenError,
        ];
    }

    private logoutOnRefreshTokenError = (action$: ActionsObservable<ReduxAction<any>>): Observable<ReduxAction<any>> => {
        return action$.pipe(
            ofType(AuthenticationActions.REFRESH_TOKEN_ERROR),
            map(() => {
                this.authenticationActions.logout();
                return { type: 'FORCED_LOG_OUT' };
            })
        );
    }
}
