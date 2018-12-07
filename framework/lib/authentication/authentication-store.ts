import { Observable } from 'rxjs';
import { HttpErrorResponse, CurrentUser } from './../models';

export interface AuthenticationStore {
    isCurrentUserAuthenticated(): Observable<boolean>;
    getLoginError(): Observable<HttpErrorResponse>;
    getCurrentUser(): Observable<CurrentUser>
}
