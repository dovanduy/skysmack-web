import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { mergeMap, take, catchError, switchMap, finalize, filter, tap } from 'rxjs/operators';
import { CurrentUser } from '@skysmack/framework';
import { NgAuthenticationStore, NgAuthenticationActions } from '@skysmack/ng-redux';
import { NgRedux } from '@angular-redux/store';


@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
    public isRefreshingToken: boolean;
    public tokenSubject: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);

    constructor(
        public authenticationStore: NgAuthenticationStore,
        public authenticationActions: NgAuthenticationActions,
        public ngRedux: NgRedux<{ hydrated: { hydrated: boolean } }>
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        return this.ngRedux.select(store => store.hydrated).pipe(
            filter(state => state.hydrated === true),
            take(1),
            switchMap(() => this.authenticationStore.getCurrentUser().pipe(
                take(1),
                mergeMap((currentUser: CurrentUser) => {
                    return next.handle(this.addTokenToRequest(request, currentUser)).pipe(
                        catchError(error => {
                            if (error instanceof HttpErrorResponse) {
                                switch ((error as HttpErrorResponse).status) {
                                    case 401:
                                        return this.handle401Error(request, next);
                                    default:
                                        return throwError(error);
                                }
                            } else {
                                return throwError(error);
                            }
                        })
                    );
                })
            ))
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            // TODO: getCurrentUser needs to be replaced with a method that actually refreshes the token.
            return this.authenticationStore.getCurrentUser()
                .pipe(
                    switchMap((currentUser: CurrentUser) => {
                        this.tokenSubject.next(currentUser);
                        return next.handle(this.addTokenToRequest(request, currentUser));
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                );
        } else {
            this.isRefreshingToken = false;

            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(currentUser => next.handle(this.addTokenToRequest(request, currentUser)))
            );
        }
    }

    public addTokenToRequest(request: HttpRequest<any>, currentUser: CurrentUser): HttpRequest<any> {
        if (currentUser) {
            if (currentUser.token_type && currentUser.access_token) {
                return request.clone({
                    setHeaders: {
                        Authorization: `${currentUser.token_type} ${currentUser.access_token}`
                    }
                });
            } else {
                return request;
            }
        } else {
            return request;
        }
    }
}
