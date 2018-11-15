import { combineEpics, ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { SkysmackRequests } from './../models/skysmack-requests';
import { SkysmackActions } from './skysmack-actions';

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

    public get = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(SkysmackActions.GET_CURRENT_TENANT),
        switchMap(() => this.requests.get())
    )
}