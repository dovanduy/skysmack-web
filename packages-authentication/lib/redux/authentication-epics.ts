import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

export class AuthenticationEpics {
    public epics: Epic[];

    constructor(
        // protected requests: RecordRequests<TRecord, TKey>,
        protected prefix: string
    ) {
        this.epics = [
            this.testEpic
        ];
    }

    public testEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + 'TEST'),
        map(() => ({ type: this.prefix + 'TEST_SUCCEED' }))
    )
}