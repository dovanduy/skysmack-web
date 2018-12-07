import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { AuthenticationRequests } from './authentication-requests';
import { AuthenticationActions } from './authentication-actions';
import { log } from '@skysmack/framework';

export class AuthenticationEpics {
    public epics: Epic[];

    constructor(
        protected requests: AuthenticationRequests,
    ) {
        this.epics = [];
    }
}
