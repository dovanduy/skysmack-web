import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { AuthenticationRequests } from './authentication-requests';
import { AuthenticationActions } from './authentication-actions';

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
        map((action) => this.requests.login(action))
    )
}
