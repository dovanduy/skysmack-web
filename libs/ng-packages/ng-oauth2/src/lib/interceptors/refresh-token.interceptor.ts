import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, zip } from 'rxjs';
import { mergeMap, take, catchError, switchMap, finalize, filter, tap, map, distinctUntilChanged, defaultIfEmpty, first, flatMap } from 'rxjs/operators';
import { CurrentUser, IsAuthenticated, TokenExpiresSoon } from '@skysmack/framework';
import { NgAuthenticationStore, NgAuthenticationActions } from '@skysmack/ng-framework';
import { NgRedux } from '@angular-redux/store';
import { Oauth2Requests } from '../requests';
import { AuthenticationActions } from '@skysmack/redux';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {
    public isRefreshingToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        public authenticationStore: NgAuthenticationStore,
        public authenticationActions: NgAuthenticationActions,
        public oauth2Requests: Oauth2Requests,
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
                                // Refresh token before request and hold back other requests
                                this.refreshToken(currentUser);
                                
                                // Wait for refreshing token to finish
                                return isRefreshingTokenTrue$.pipe(
                                    flatMap(() => {
                                        return currentUser$.pipe(
                                            flatMap((currentUserUpdated) => {
                                                request = this.addTokenToRequest(request, currentUserUpdated);
                                                return next.handle(request);
                                            })
                                        )
                                    })
                                );
                            } else if (currentUser && currentUser.refresh_token && currentUser.refresh_token.length > 0 && !TokenExpiresSoon(currentUser)) {
                                // If user token is soon to expire, start a request for a new token in the background...
                                this.refreshToken(currentUser);
                            }
                            
                            // Run normal request
                            request = this.addTokenToRequest(request, currentUser);
                            return next.handle(request);
                        })
                    )
                })
            );
        }

        // return this.ngRedux.select(store => store.hydrated).pipe(
        //     filter(state => state.hydrated === true),
        //     mergeMap(() => this.isRefreshingToken$),
        //     filter(x => !x),
        //     mergeMap(() => currentUser$.pipe(
        //         mergeMap((currentUser: CurrentUser) => {
        //             console.log('wtf');
        //             request = this.addTokenToRequest(request, currentUser);
        //             return next.handle(request).pipe(
        //                 catchError(error => {
        //                     console.log('1', error.status, request.headers, currentUser.refresh_token);
        //                     // Try to refresh token if error is 401, it was attempted with authorization and a refresh token exist for the user
        //                     if (error instanceof HttpErrorResponse && error.status === 401 && request.headers.has('Authorization') && currentUser.refresh_token && !request.url.endsWith('/token')) {
        //                         console.log('2');
        //                         if (!this.isRefreshingToken$.getValue()) {
        //                             console.log('3');
        //                             this.isRefreshingToken$.next(true);
        //                             return this.oauth2Requests.refreshToken(currentUser).pipe(
        //                                 mergeMap(refreshTokenReduxAction => {
        //                                     console.log(' --- 4 -------------------------------------'); 
        //                                     this.ngRedux.dispatch(Object.assign({}, refreshTokenReduxAction));
        //                                     this.isRefreshingToken$.next(false);
        //                                     if (refreshTokenReduxAction.type === AuthenticationActions.REFRESH_TOKEN_SUCCESS && (refreshTokenReduxAction.payload as CurrentUser).access_token) {
        //                                         console.log('refresh_token done, retrying request', request);
        //                                         return next.handle(this.addTokenToRequest(request, (refreshTokenReduxAction.payload as CurrentUser)));
        //                                     } else {                                            
        //                                         return throwError(error);
        //                                     }
        //                                 })
        //                             );
        //                         } else {
        //                             return this.isRefreshingToken$.pipe(
        //                                 filter(x => !x),
        //                                 take(1),
        //                                 mergeMap(() => {
        //                                     return currentUser$.pipe(distinctUntilChanged())
        //                                 }),
        //                                 filter(user => user.access_token !== currentUser.access_token),
        //                                 take(1),
        //                                 mergeMap(user => {
        //                                     console.log('woah, new access token!');
        //                                     return next.handle(this.addTokenToRequest(request, user));
        //                                 })
        //                             );
        //                         }
        //                     } else {
        //                         return throwError(error);
        //                     }
        //                 })
        //             );
        //         })
        //     ))
        // );
    }

    private refreshToken(currentUser: CurrentUser, error: HttpErrorResponse = null) {
        if (!this.isRefreshingToken$.getValue()) {
            this.isRefreshingToken$.next(true);
            this.oauth2Requests.refreshToken(currentUser).pipe(
                map(refreshTokenReduxAction => {
                    this.ngRedux.dispatch(Object.assign({}, refreshTokenReduxAction));
                    this.isRefreshingToken$.next(false);
                }),
                first()
            ).subscribe();
        } 
    }

    private addTokenToRequest(request: HttpRequest<any>, currentUser: CurrentUser): HttpRequest<any> {
        if (currentUser && !request.url.endsWith('/token')) {
            if (currentUser.token_type && currentUser.access_token) {
                // console.log('adding token to request', request, currentUser);
                return request.clone({
                    setHeaders: {
                        Authorization: `${currentUser.token_type} ${currentUser.access_token}`
                    },
                    withCredentials: true
                });
            } else {
                return request;
            }
        } else {
            return request;
        }
    }
}
