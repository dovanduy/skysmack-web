import { LocalPageTypes, StrIndex, LocalObject, NumIndex, HttpResponse, linq, GlobalProperties, QueueItem, HttpErrorResponse, pipeFns, getValues, flattenArray, jsonPrint } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, ReduxOfflineMeta, sharedReducer } from '@skysmack/redux';
import { User } from '../../models/user';
import { UsersActions } from './users-actions';
import { GetUsersRolesSuccessPayload } from '../../payloads';
import { USERS_REDUX_KEY, USERS_REDUCER_KEY } from '../../constants';
import { UserRoles } from '../../models';

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
            // Prep data
            const castedAction = action as ReduxAction<GetUsersRolesSuccessPayload>;
            const { packagePath, userRoles } = castedAction.payload;
            const userRolesArray = userRoles;
            const userRolesState = newState.usersRoles[packagePath] ? newState.usersRoles[packagePath] : {};

            // Update state
            userRolesArray.forEach(userRole => {
                const userRoleId = userRole.userId;
                userRolesState[userRoleId] = userRole.roleNames;
                newState.usersRoles[packagePath] = userRolesState;
            });

            return newState;
        }
        case prefix + UsersActions.GET_ROLES_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case prefix + UsersActions.ADD_ROLES: {
            // Prep data
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<UserRoles[], HttpResponse, UserRoles[]>>;
            const commitMeta = castedAction.meta.offline.commit.meta;
            const { value, stateKey } = commitMeta;
            const userRolesArray = value;
            const userRoleState = newState.usersRoles[stateKey] ? newState.usersRoles[stateKey] : {};

            // Update state
            userRolesArray.forEach(userRoles => {
                const roleNames = userRoleState[userRoles.userId] ? userRoleState[userRoles.userId] : [];
                userRoleState[userRoles.userId] = roleNames.concat(userRoles.roleNames);
            });

            newState.usersRoles[stateKey] = userRoleState;

            return newState;
        }
        case prefix + UsersActions.ADD_ROLES_FAILURE: {
            // Prep data
            const castedAction: ReduxAction<HttpErrorResponse, { stateKey: string, value: UserRoles[], queueItems: QueueItem[] }> = action;
            const { stateKey, value } = castedAction.meta;
            const userRolesArray = value;
            const userRoleState = newState.usersRoles[stateKey] ? newState.usersRoles[stateKey] : {};

            // Update state
            userRolesArray.forEach(userRoles => {
                const userId = userRoles.userId;
                const roleNames = userRoles.roleNames;
                userRoleState[userId] = userRoleState[userId].filter(currentRole => !roleNames.includes(currentRole));
            });

            newState.usersRoles[stateKey] = userRoleState;

            // Log warning
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }

            return newState;
        }

        case prefix + UsersActions.REMOVE_ROLES: {
            // Prep data
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<UserRoles[], HttpResponse, UserRoles[]>>;
            const commitMeta = castedAction.meta.offline.commit.meta;
            const { value, stateKey } = commitMeta;
            const userRolesArray = value;
            const userRoleState = newState.usersRoles[stateKey] ? newState.usersRoles[stateKey] : {};

            // Update state
            userRolesArray.forEach(userRoles => {
                const userId = userRoles.userId;
                const rolesToRemove = userRoles.roleNames;
                const currentRoles = userRoleState[userId] ? userRoleState[userId] : [];
                userRoleState[userRoles.userId] = currentRoles.filter(role => !rolesToRemove.includes(role));
            });

            newState.usersRoles[stateKey] = userRoleState;

            return newState;
        }
        case prefix + UsersActions.REMOVE_ROLES_FAILURE: {
            // Prep data
            const castedAction: ReduxAction<HttpErrorResponse, { stateKey: string, value: UserRoles[], queueItems: QueueItem[] }> = action;
            const { stateKey, value } = castedAction.meta;
            const userRolesArray = value;
            const userRoleState = newState.usersRoles[stateKey] ? newState.usersRoles[stateKey] : {};

            // Update state
            userRolesArray.forEach(userRoles => {
                const userId = userRoles.userId;
                const roleNames = userRoles.roleNames;
                userRoleState[userId] = userRoleState[userId].concat(roleNames);
            });

            newState.usersRoles[stateKey] = userRoleState;

            // Log warning
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
