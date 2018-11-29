import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

export class AuthenticationEpics {
    public epics: Epic[];

    constructor(
        protected requests: any, // TODO: Get interface/abstract for requests
        protected prefix: string
    ) {
        this.epics = [
            this.loginEpic
        ];
    }

    public loginEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + 'TEST'),
        map(() => ({ type: this.prefix + 'TEST_SUCCEED' }))
    )
    //     public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedRecordsPayload>>) => action$.pipe(
    //         ofType(this.prefix + RecordActionsBase.GET_PAGED),
    //         switchMap(action => this.requests.getPaged(action))
    //     )
}
