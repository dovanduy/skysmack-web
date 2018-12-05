import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';

export interface AuthenticationRequests {
    login(action: ReduxAction<{ email: string, password: string, path: string }>): Observable<ReduxAction>;
}
