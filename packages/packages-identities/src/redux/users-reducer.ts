import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { User } from './../models/user';
import { UsersActions } from './users-actions';
import { GetUsersRolesSuccessPayload } from '../payloads';

/**
 * This is to be used when you want to access users via the GLOBAL state. E.g. state.users (where users is the reducer name.)
 */
export class UsersAppState extends AppState {
    public users: UsersState;
}

export class UsersState implements RecordState<User, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<User, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
    public usersRoles: StrIndex<StrIndex<string[]>> = {};
}

export function usersReducer(state = new UsersState(), action: ReduxAction, prefix: string = 'USERS_'): UsersState {
    switch (action.type) {
        case prefix + UsersActions.GET_USERS_ROLES_SUCCESS: {
            const newState = { ...state };
            const castedAction = action as ReduxAction<GetUsersRolesSuccessPayload>;
            newState.usersRoles[castedAction.payload.packagePath] = castedAction.payload.userRoles;
            return newState;
        }
        case prefix + UsersActions.GET_USERS_ROLES_ERROR: {
            console.log('Get users roles error: ', action.payload);
            return state;
        }
        default:
            return {
                ...state,
                ...recordReducersBase<UsersState, User, number>(state, action, prefix)
            };
    }
}
