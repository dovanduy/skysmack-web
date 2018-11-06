import { SkysmackRequests } from 'lib/models/skysmack-requests';
import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { AnyAction } from 'redux';

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
        ofType('GET_CURRENT_TENANT'),
        switchMap((action: AnyAction) => this.requests.get()),
        map(result => ({
            type: 'GET_CURRENT_TENANT_SUCCESS',
            payload: result
        }))
    )
}