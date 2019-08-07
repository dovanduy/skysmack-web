import { LocalPageTypes, StrIndex, LocalObject, NumIndex, GlobalProperties, HttpResponse, linq } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase, ReduxOfflineMeta } from '@skysmack/redux';
import { Application } from '../../models/application';
import { APPLICATIONS_REDUCER_KEY, APPLICATIONS_REDUX_KEY } from '../../constants/constants';
import { ApplicationsActions } from './applications-actions';
import { GetApplicationsRolesSuccessPayload } from '../../payloads/get-applications-roles-success-payload';

/**
 * This is to be used when you want to access applications via the GLOBAL state. E.g. state.applications (where applications is the reducer name.)
 */
export class ApplicationsAppState extends AppState {
    public applications: ApplicationsState;
}

export class ApplicationsState implements RecordState<Application, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Application, number>>> = {};
    public applicationsRoles: StrIndex<NumIndex<string[]>> = {};
}

export function applicationsReducer(state = new ApplicationsState(), action: ReduxAction, prefix: string = APPLICATIONS_REDUX_KEY): ApplicationsState {
    state = sharedReducer(state, action, new ApplicationsState(), APPLICATIONS_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + ApplicationsActions.GET_APPLICATION_ROLES_SUCCESS: {
            const castedAction = action as ReduxAction<GetApplicationsRolesSuccessPayload>;
            if (!newState.applicationsRoles[castedAction.payload.packagePath]) {
                newState.applicationsRoles[castedAction.payload.packagePath] = castedAction.payload.applicationRoles;
            } else {
                Object.keys(castedAction.payload.applicationRoles).forEach(roleId => {
                    newState.applicationsRoles[castedAction.payload.packagePath][roleId] = castedAction.payload.applicationRoles[roleId];
                });
            }

            return newState;
        }
        case prefix + ApplicationsActions.GET_APPLICATION_ROLES_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case prefix + ApplicationsActions.ADD_APPLICATION_ROLES: {
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>;
            const commitMeta = castedAction.meta.offline.commit.meta;
            Object.keys(commitMeta.value).forEach(roleId => {
                const currentApplicationRoles: string[] = newState.applicationsRoles[commitMeta.stateKey][roleId];
                newState.applicationsRoles[commitMeta.stateKey][roleId] = linq(currentApplicationRoles.concat(commitMeta.value[roleId])).distinct().ok();
            });

            return newState;
        }
        case prefix + ApplicationsActions.ADD_APPLICATION_ROLES_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case prefix + ApplicationsActions.REMOVE_APPLICATION_ROLES_SUCCESS: {
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>;
            const commitMeta = castedAction.meta.offline.commit.meta;

            Object.keys(commitMeta.value).forEach(roleId => {
                const currentApplicationRoles: string[] = newState.applicationsRoles[commitMeta.stateKey][roleId];
                newState.applicationsRoles[commitMeta.stateKey][roleId] = currentApplicationRoles.filter(currentApplicationRole => {
                    return !commitMeta.value[roleId].find(roleToRemove => roleToRemove === currentApplicationRole);
                });
            });

            return newState;
        }
        case prefix + ApplicationsActions.REMOVE_APPLICATION_ROLES_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        default:
            return {
                ...state,
                ...recordReducersBase<ApplicationsState, Application, number>(state, action, prefix)
            };
    }
}
