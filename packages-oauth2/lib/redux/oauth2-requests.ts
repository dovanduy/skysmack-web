import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';

export interface Oauth2Requests {
    login(action: ReduxAction<{ email: string, password: string, path: string }>): Observable<ReduxAction>;
}
