import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, catchError, filter, map, defaultIfEmpty, first, flatMap } from 'rxjs/operators';
import { CurrentUser, IsAuthenticated, TokenExpiresSoon } from '@skysmack/framework';
import { NgAuthenticationStore, NgAuthenticationActions } from '@skysmack/ng-framework';
import { NgRedux } from '@angular-redux/store';
import { OAuth2Requests, InterceptorSkipHeader } from '../requests/oauth2-requests';
import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import { ReduxAction, AuthenticationActions } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {
    public isRefreshingToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        public authenticationStore: NgAuthenticationStore,
        public authenticationActions: NgAuthenticationActions,
        public oauth2Requests: OAuth2Requests,
        public ngRedux: NgRedux<any>
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        if (request.headers.has(InterceptorSkipHeader)) {
            const headers = request.headers.delete(InterceptorSkipHeader);
            return next.handle(request.clone({ headers }));
        } else {
            const isHydrated$ = this.ngRedux.select(store => store.hydrated).pipe(
                filter(state => state.hydrated),
                take(1)
            );

            const isRefreshingTokenTrue$ = this.isRefreshingToken$.pipe(filter(x => !x), first());

            const currentUser$ = this.authenticationStore.getCurrentUser().pipe(defaultIfEmpty<CurrentUser>(null), first<CurrentUser>());

            // When hydrated is true, refreshingToken is false; then get currentUser. 
            return isHydrated$.pipe(
                flatMap(() => {
                    return currentUser$.pipe(
                        flatMap(currentUser => {
                            if (currentUser && currentUser.refresh_token && currentUser.refresh_token.length > 0 && !IsAuthenticated(currentUser)) {
                                // User should be authenticated but is not. There is a refresh token. 
                                // Refresh token before request and block other requests. 
                                this.refreshToken(currentUser);

                                // Wait for refreshing token to finish, and then run the request with updated user information. 
                                return isRefreshingTokenTrue$.pipe(
                                    flatMap(() => {
                                        return currentUser$.pipe(
                                            flatMap((currentUserUpdated) => {
                                                if (IsAuthenticated(currentUserUpdated)) {
                                                    // Use new user info to get request
                                                    return next.handle(this.addTokenToRequest(request, currentUserUpdated));
                                                } else {                                                    
                                                    // Something went wrong, assume current user no longer has a valid access token
                                                    // Clear user
                                                    this.authenticationActions.logout();
                                                    // Return request without access token
                                                    return next.handle(request);
                                                }
                                            })
                                        )
                                    })
                                );
                            } else if (currentUser && currentUser.refresh_token && currentUser.refresh_token.length > 0 && TokenExpiresSoon(currentUser)) {
                                // If user token is soon to expire, start a request for a new token in the background.
                                this.refreshToken(currentUser);
                            }

                            // Run normal request
                            return next.handle(this.addTokenToRequest(request, currentUser)).pipe(
                                catchError(error => {
                                    // Catch if refresh token timeout is misaligned with backend
                                    // Try to refresh token if error is 401, it was attempted with authorization and a refresh token exist for the user
                                    if (error instanceof HttpErrorResponse && error.status === 401 && request.headers.has('Authorization')) {
                                        if (currentUser && currentUser.refresh_token) {
                                            // Refresh token and block other requests
                                            this.refreshToken(currentUser);

                                            // Wait for refreshing token to finish
                                            return isRefreshingTokenTrue$.pipe(
                                                flatMap(() => {
                                                    return currentUser$.pipe(
                                                        flatMap((currentUserUpdated) => {
                                                            // Retry request with updated user.
                                                            return next.handle(this.addTokenToRequest(request, currentUserUpdated));
                                                        })
                                                    )
                                                })
                                            );
                                        } else {
                                            // Assume current user no longer has a valid access token
                                            // Clear user
                                            this.authenticationActions.logout();
                                            // Return request without access token
                                            return next.handle(request);
                                        }
                                    } else {
                                        return throwError(error);
                                    }
                                })
                            );
                        })
                    )
                })
            );
        }
    }

    private refreshToken(currentUser: CurrentUser) {
        // Try and request new access token, if refreshing is not already in progress.
        if (!this.isRefreshingToken$.getValue()) {
            // Block other requests
            this.isRefreshingToken$.next(true);
            // Request the refreshed access token
            this.oauth2Requests.refreshToken(currentUser).pipe(
                map(refreshTokenReduxAction => {
                    // Store new user with redux
                    this.ngRedux.dispatch(Object.assign({}, refreshTokenReduxAction));
                    // Signal that we're done refreshing
                    this.isRefreshingToken$.next(false);
                }),
                catchError((error) => {
                    // We assume the user should be logged out
                    this.authenticationActions.logout();                    
                    // Refreshing token went wrong, however we still want to stop blocking. 
                    this.isRefreshingToken$.next(false);
                    // Throw error
                    return throwError(error);
                }),
                // Kill stream when we're done
                first()
            ).subscribe();
        }
    }

    private addTokenToRequest(request: HttpRequest<any>, currentUser: CurrentUser): HttpRequest<any> {
        // If the user is not null, the token type exists and an access token exists, then we add a token to the Authorization header
        // The token could be expired etc., but that should be handled elsewhere. 
        if (currentUser && currentUser.token_type && currentUser.access_token) {
            return request.clone({
                setHeaders: {
                    Authorization: `${currentUser.token_type} ${currentUser.access_token}`
                },
                withCredentials: true
            });
        } else {
            return request;
        }
    }
}
