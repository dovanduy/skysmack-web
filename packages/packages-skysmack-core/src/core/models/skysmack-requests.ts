import { Observable } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { Skysmack } from './skysmack';
import { HttpErrorResponse } from '@skysmack/framework';

export interface SkysmackRequests {
    get(): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>>
}
