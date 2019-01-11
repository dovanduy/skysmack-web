import { RecordActionsBase, ReduxAction } from '@skysmack/redux';
import { UsersAppState } from './users-reducer';
import { Store } from 'redux';
import { GetUsersRolesPayload } from '../payloads/get-users-roles-payload';

export class UsersActions extends RecordActionsBase<UsersAppState, Store<UsersAppState>> {
    public static GET_USERS_ROLES = 'GET_USERS_ROLES';
    public static GET_USERS_ROLES_SUCCESS = 'GET_USERS_ROLES_SUCCESS';
    public static GET_USERS_ROLES_ERROR = 'GET_USERS_ROLES_ERROR';

    constructor(protected store: Store<UsersAppState>) { super(store, 'USERS_', ['users']); }

    public getUsersRoles(packagePath: string, ids: number[]): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetUsersRolesPayload>({
            type: this.prefix + UsersActions.GET_USERS_ROLES,
            payload: {
                packagePath,
                ids
            }
        })))
    }
}
