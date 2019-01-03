import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { SkysmackRequests, Skysmack } from './../models';
import { SkysmackActions } from './skysmack-actions';
import { Observable } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { HttpErrorResponse } from '@skysmack/framework';

export class SkysmackEpics {
    public epics: Epic[];
    protected prefix = 'SKYSMACK_';

    constructor(
        protected requests: SkysmackRequests
    ) {
        this.epics = [
            this.get
        ];
    }

    public get = (action$: ActionsObservable<any>): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(SkysmackActions.GET_SKYSMACK),
            switchMap(() => this.requests.get()));
    }
}
