import { Observable } from 'rxjs';
import { HttpErrorResponse, CurrentUser } from '@skysmack/framework';

export interface AuthenticationStore {
    isCurrentUserAuthenticated(): Observable<boolean>;
    getLoginError(): Observable<HttpErrorResponse>;
    getCurrentUser(): Observable<CurrentUser>
}
