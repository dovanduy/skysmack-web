import { RecordActionsBase, ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { UsersAppState } from './users-reducer';
import { Store } from 'redux';
import { GetUsersRolesPayload } from '../payloads/get-users-roles-payload';
import { HttpMethod, NumIndex, HttpResponse, LocalObject, StrIndex } from '@skysmack/framework';
import { User } from '../models';

export class UsersActions extends RecordActionsBase<UsersAppState, Store<UsersAppState>> {
    public static GET_ROLES = 'GET_ROLES';
    public static GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
    public static GET_ROLES_FAILURE = 'GET_ROLES_FAILURE';

    public static ADD_ROLES = 'ADD_ROLES';
    public static ADD_ROLES_SUCCESS = 'ADD_ROLES_SUCCESS';
    public static ADD_ROLES_FAILURE = 'ADD_ROLES_FAILURE';

    public static REMOVE_ROLES = 'REMOVE_ROLES';
    public static REMOVE_ROLES_SUCCESS = 'REMOVE_ROLES_SUCCESS';
    public static REMOVE_ROLES_FAILURE = 'REMOVE_ROLES_FAILURE';

    constructor(protected store: Store<UsersAppState>) { super(store, 'USERS_', ['users']); }

    public getUsersRoles(packagePath: string, ids: number[]): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetUsersRolesPayload>({
            type: this.prefix + UsersActions.GET_ROLES,
            payload: {
                packagePath,
                ids
            }
        })));
    }

    public addUsersRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
            type: this.prefix + UsersActions.ADD_ROLES,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
                    new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
                        this.addAdditionalPaths(packagePath) + '/roles/add',
                        HttpMethod.POST,
                        userRolesDictionary
                    )),
                    new ReduxAction({
                        type: this.prefix + UsersActions.ADD_ROLES_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary,
                            queueItems: [] as any
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + UsersActions.ADD_ROLES_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary,
                            queueItems: [] as any
                        }
                    })
                )
            )
        })));
    }

    public removeUsersRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
            type: this.prefix + UsersActions.REMOVE_ROLES,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
                    new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
                        this.addAdditionalPaths(packagePath) + '/roles/remove',
                        HttpMethod.POST,
                        userRolesDictionary
                    )),
                    new ReduxAction({
                        type: this.prefix + UsersActions.REMOVE_ROLES_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary,
                            queueItems: [] as any
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + UsersActions.REMOVE_ROLES_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary,
                            queueItems: [] as any
                        }
                    })
                )
            )
        })));
    }

    protected getMessageParams(record: LocalObject<User, number>): StrIndex<string> {
        return {
            email: record.object.email
        };
    }
}
