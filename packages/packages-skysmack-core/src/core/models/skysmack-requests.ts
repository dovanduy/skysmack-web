import { Observable } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { Skysmack } from './skysmack';
import { HttpErrorResponse, StrIndex } from '@skysmack/framework';

export interface SkysmackRequests {
    get(): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>>
    getPermissions(action: ReduxAction<string>): Observable<ReduxAction<StrIndex<string>, string> | ReduxAction<HttpErrorResponse>>
}
