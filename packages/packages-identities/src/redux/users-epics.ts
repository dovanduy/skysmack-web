import { RecordEpicsBase, ReduxAction } from '@skysmack/redux';
import { ofType, ActionsObservable } from 'redux-observable';
import { User } from '../models/user';
import { UsersActions } from './users-actions';
import { switchMap } from 'rxjs/operators';
import { UsersRequests } from '../models/users-requests';
import { HttpErrorResponse } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { GetUsersRolesSuccessPayload } from '../payloads/get-users-roles-success-payload';
import { GetUsersRolesPayload } from '../payloads/get-users-roles-payload';

export class UsersEpics extends RecordEpicsBase<User, number> {
    constructor(protected requests: UsersRequests) {
        super(requests, 'USERS_');
        this.epics = this.epics.concat([
            this.getUsersRolesEpic
        ]);
    }

    public getUsersRolesEpic = (action$: ActionsObservable<ReduxAction<GetUsersRolesPayload>>): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + UsersActions.GET_USERS_ROLES),
            switchMap((action: ReduxAction<GetUsersRolesPayload>) => this.requests.getUsersRoles(action.payload.packagePath, action.payload.ids))
        );
    }
}