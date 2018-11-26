import { NgRedux } from '@angular-redux/store';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CurrentUser } from '@skysmack/framework';


@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(
        public ngRedux: NgRedux<any>
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.ngRedux.select((state: any) => state.authenticatedUser.currentUser).pipe(
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
