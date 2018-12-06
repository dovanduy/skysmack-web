import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { AuthenticationRequests } from './authentication-requests';
import { AuthenticationActions } from './authentication-actions';
import { log } from '@skysmack/framework';

export class AuthenticationEpics {
    public epics: Epic[];

    constructor(
        protected requests: AuthenticationRequests,
        // protected prefix: string
    ) {
        this.epics = [
            this.loginEpic
        ];
    }

    public loginEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthenticationActions.LOG_IN),
        switchMap((action) => this.requests.login(action))
    )
}
