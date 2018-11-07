import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { SkysmackRequests } from './../models/skysmack-requests';
import { SkysmackActions } from './skysmack-actions';

export class SkysmackEpics {
    protected epics: any;
    protected prefix = 'skysmack';

    constructor(
        protected requests: SkysmackRequests
    ) {
        this.epics = combineEpics(
            this.get,
        );
    }

    public getEpics = () => this.epics;

    public get = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(SkysmackActions.GET_CURRENT_TENANT),
        switchMap(() => this.requests.get())
    )
}