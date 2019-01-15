import { RecordActionsBase, ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { UsersAppState } from './users-reducer';
import { Store } from 'redux';
import { GetUsersRolesPayload } from '../payloads/get-users-roles-payload';
import { HttpMethod, NumIndex, HttpResponse } from '@skysmack/framework';

export class UsersActions extends RecordActionsBase<UsersAppState, Store<UsersAppState>> {
    public static GET_USERS_ROLES = 'GET_USERS_ROLES';
    public static GET_USERS_ROLES_SUCCESS = 'GET_USERS_ROLES_SUCCESS';
    public static GET_USERS_ROLES_ERROR = 'GET_USERS_ROLES_ERROR';

    public static ADD_USERS_ROLES = 'ADD_USERS_ROLES';
    public static ADD_USERS_ROLES_SUCCESS = 'ADD_USERS_ROLES_SUCCESS';
    public static ADD_USERS_ROLES_ERROR = 'ADD_USERS_ROLES_ERROR';

    public static REMOVE_USERS_ROLES = 'REMOVE_USERS_ROLES';
    public static REMOVE_USERS_ROLES_SUCCESS = 'REMOVE_USERS_ROLES_SUCCESS';
    public static REMOVE_USERS_ROLES_ERROR = 'REMOVE_USERS_ROLES_ERROR';

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

    public addUsersRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
        console.log('adding user role:', packagePath, userRolesDictionary);
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
            type: this.prefix + UsersActions.ADD_USERS_ROLES,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
                    new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
                        this.addAdditionalPaths(packagePath) + '/roles/add',
                        HttpMethod.POST,
                        userRolesDictionary
                    )),
                    new ReduxAction({
                        type: this.prefix + UsersActions.ADD_USERS_ROLES_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + UsersActions.ADD_USERS_ROLES_ERROR,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary
                        }
                    })
                )
            )
        })));
    }

    public removeUsersRoles(packagePath: string, ids: number[]): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: this.prefix + UsersActions.REMOVE_USERS_ROLES,
            payload: {
                packagePath,
                ids
            }
        })))
    }
}
