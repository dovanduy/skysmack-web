import { LocalPageTypes, StrIndex, LocalObject, NumIndex, HttpResponse, linq, GlobalProperties, QueueItem, HttpErrorResponse, pipeFns, getValues, flattenArray } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, ReduxOfflineMeta, sharedReducer } from '@skysmack/redux';
import { User } from '../../models/user';
import { UsersActions } from './users-actions';
import { GetUsersRolesSuccessPayload } from '../../payloads';
import { USERS_REDUX_KEY, USERS_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access users via the GLOBAL state. E.g. state.users (where users is the reducer name.)
 */
export class UsersAppState extends AppState {
    public users: UsersState;
}

export class UsersState implements RecordState<User, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<User, number>>> = {};
    public usersRoles: StrIndex<NumIndex<string[]>> = {};
}

export function usersReducer(state = new UsersState(), action: any, prefix: string = USERS_REDUX_KEY): UsersState {
    state = sharedReducer(state, action, new UsersState(), USERS_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + UsersActions.GET_ROLES_SUCCESS: {
            const castedAction = action as ReduxAction<GetUsersRolesSuccessPayload>;
            if (!newState.usersRoles[castedAction.payload.packagePath]) {
                newState.usersRoles[castedAction.payload.packagePath] = castedAction.payload.userRoles;
            } else {
                Object.keys(castedAction.payload.userRoles).forEach(roleId => {
                    newState.usersRoles[castedAction.payload.packagePath][roleId] = castedAction.payload.userRoles[roleId];
                });
            }

            return newState;
        }
        case prefix + UsersActions.GET_ROLES_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case prefix + UsersActions.ADD_ROLES: {
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>;
            const commitMeta = castedAction.meta.offline.commit.meta;
            Object.keys(commitMeta.value).forEach(roleId => {
                const currentUserRoles: string[] = newState.usersRoles[commitMeta.stateKey][roleId] ? newState.usersRoles[commitMeta.stateKey][roleId] : [];
                newState.usersRoles[commitMeta.stateKey][roleId] = linq(currentUserRoles.concat(commitMeta.value[roleId])).distinct().ok();
            });

            return newState;
        }
        case prefix + UsersActions.ADD_ROLES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse, { stateKey: string, value: NumIndex<string[]>, queueItems: QueueItem[] }> = action;
            const { stateKey, value } = castedAction.meta;
            const rolesFailedToAdd: string[] = pipeFns(getValues, flattenArray)(value);

            Object.keys(value).forEach(roleIdKey => {
                const currentUserRoles: string[] = newState.usersRoles[stateKey][roleIdKey] ? newState.usersRoles[stateKey][roleIdKey] : [];
                newState.usersRoles[stateKey][roleIdKey] = currentUserRoles.filter(currentRole => !rolesFailedToAdd.includes(currentRole));
            });

            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case prefix + UsersActions.REMOVE_ROLES: {
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>;
            const commitMeta = castedAction.meta.offline.commit.meta;

            Object.keys(commitMeta.value).forEach(roleId => {
                const currentUserRoles: string[] = newState.usersRoles[commitMeta.stateKey][roleId];
                newState.usersRoles[commitMeta.stateKey][roleId] = currentUserRoles.filter(currentUserRole => {
                    return !commitMeta.value[roleId].find(roleToRemove => roleToRemove === currentUserRole);
                });
            });

            return newState;
        }
        case prefix + UsersActions.REMOVE_ROLES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse, { stateKey: string, value: NumIndex<string[]>, queueItems: QueueItem[] }> = action;
            const { stateKey, value } = castedAction.meta;
            const rolesFailedToRemove: string[] = pipeFns(getValues, flattenArray)(value);

            Object.keys(value).forEach(roleIdKey => {
                const currentUserRoles: string[] = newState.usersRoles[stateKey][roleIdKey] ? newState.usersRoles[stateKey][roleIdKey] : [];
                newState.usersRoles[stateKey][roleIdKey] = currentUserRoles.concat(rolesFailedToRemove);
            });

            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }


        default:
            return {
                ...state,
                ...recordReducersBase<UsersState, User, number>(state, action, prefix)
            };
    }
}
