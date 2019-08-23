import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { HttpErrorResponse, CurrentUser, IsAuthenticated } from '@skysmack/framework';
import { Injectable } from '@angular/core';
import { AuthenticationStore, AuthenticationAppState, HydratedAppState } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgAuthenticationStore implements AuthenticationStore {
    constructor(
        protected store: NgRedux<AuthenticationAppState>,
        protected hydratedStore: NgRedux<HydratedAppState>
    ) { }

    public isCurrentUserAuthenticated(): Observable<boolean> {
        return this.hydratedStore.select(state => state.hydrated.hydrated).pipe(
            filter(x => x),
            switchMap(() => this.getCurrentUser().pipe(
                map((currentUser: CurrentUser) => IsAuthenticated(currentUser))
            ))
        );
    }

    public getLoginError(): Observable<HttpErrorResponse> {
        return this.store.select((state: AuthenticationAppState) => state.authentication.loginError);
    }

    public getCurrentUser(): Observable<CurrentUser> {
        return this.store.select((state: AuthenticationAppState) => state.authentication.currentUser);
    }
}
