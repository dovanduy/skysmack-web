import { RecordActionsBase, ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { ApplicationsAppState } from './applications-reducer';
import { Store } from 'redux';
import { GetApplicationsRolesPayload } from '../../payloads/get-applications-roles-payload';
import { HttpMethod, NumIndex, HttpResponse, LocalObject, StrIndex } from '@skysmack/framework';
import { Application } from '../../models';
import { APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS } from '../../constants';

export class ApplicationsActions extends RecordActionsBase<ApplicationsAppState, Store<ApplicationsAppState>> {
    public static GET_APPLICATION_ROLES = 'GET_APPLICATION_ROLES';
    public static GET_APPLICATION_ROLES_SUCCESS = 'GET_APPLICATION_ROLES_SUCCESS';
    public static GET_APPLICATION_ROLES_FAILURE = 'GET_APPLICATION_ROLES_FAILURE';

    public static ADD_APPLICATION_ROLES = 'ADD_APPLICATION_ROLES';
    public static ADD_APPLICATION_ROLES_SUCCESS = 'ADD_APPLICATION_ROLES_SUCCESS';
    public static ADD_APPLICATION_ROLES_FAILURE = 'ADD_APPLICATION_ROLES_FAILURE';

    public static REMOVE_APPLICATION_ROLES = 'REMOVE_APPLICATION_ROLES';
    public static REMOVE_APPLICATION_ROLES_SUCCESS = 'REMOVE_APPLICATION_ROLES_SUCCESS';
    public static REMOVE_APPLICATION_ROLES_FAILURE = 'REMOVE_APPLICATION_ROLES_FAILURE';

    constructor(protected store: Store<ApplicationsAppState>) { super(store, APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS); }

    public getApplicationsRoles(packagePath: string, ids: number[]): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetApplicationsRolesPayload>({
            type: this.prefix + ApplicationsActions.GET_APPLICATION_ROLES,
            payload: {
                packagePath,
                ids
            }
        })));
    }

    public addApplicationsRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
            type: this.prefix + ApplicationsActions.ADD_APPLICATION_ROLES,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
                    new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
                        this.addAdditionalPaths(packagePath) + '/roles/add',
                        HttpMethod.POST,
                        userRolesDictionary
                    )),
                    new ReduxAction({
                        type: this.prefix + ApplicationsActions.ADD_APPLICATION_ROLES_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary,
                            queueItems: [] as any
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + ApplicationsActions.ADD_APPLICATION_ROLES_FAILURE,
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

    public removeApplicationsRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
            type: this.prefix + ApplicationsActions.REMOVE_APPLICATION_ROLES,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
                    new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
                        this.addAdditionalPaths(packagePath) + '/roles/remove',
                        HttpMethod.POST,
                        userRolesDictionary
                    )),
                    new ReduxAction({
                        type: this.prefix + ApplicationsActions.REMOVE_APPLICATION_ROLES_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: userRolesDictionary,
                            queueItems: [] as any
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + ApplicationsActions.REMOVE_APPLICATION_ROLES_FAILURE,
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

    public getMessageParams(record: LocalObject<Application, number>): StrIndex<string> {
        return {
            email: record.object.displayName
        };
    }
}
