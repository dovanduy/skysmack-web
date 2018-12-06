import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { CurrentUser } from '@skysmack/framework';
import { DefaultAuthenticationStore } from './default-authentication-store';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(
        public authenticationStore: DefaultAuthenticationStore
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationStore.getCurrentUser().pipe(
            take(1),
            mergeMap((currentUser: CurrentUser) => {
                if (currentUser) {
                    if (currentUser.token_type && currentUser.access_token) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `${currentUser.token_type} ${currentUser.access_token}`
                            }
                        });
                    }
                }
                return next.handle(request);
            }),
        );
    }
}
