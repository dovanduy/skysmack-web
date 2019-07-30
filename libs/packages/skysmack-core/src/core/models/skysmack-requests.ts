import { Observable } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { Skysmack } from './skysmack';
import { HttpErrorResponse, StrIndex } from '@skysmack/framework';

export interface SkysmackRequests {
    get(action: ReduxAction): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>>
    getPermissions(action: ReduxAction<string>): Observable<ReduxAction<string[], string> | ReduxAction<HttpErrorResponse>>
    getAvailablePermissions(action: ReduxAction<string>): Observable<ReduxAction<StrIndex<string>, string> | ReduxAction<HttpErrorResponse>>
}
