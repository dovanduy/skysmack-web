import { Store } from 'redux';
import { EffectRequest, Effect } from '../models';
import { SettingsAppState } from '../reducers/settings-reducer';
import { ReduxAction } from '../action-types/redux-action';
import { PackagePathPayload } from '../payloads/package-path-payload';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { OfflineMeta } from '../metas/offline-redux/offline-meta';
import { CommitMeta } from '../metas/offline-redux/commit-meta';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';
import { HttpResponse, LocalObject, QueueItem, HttpMethod } from '@skysmack/framework';

export class SettingsActions {
    public static GET_SETTINGS = 'GET_SETTINGS';
    public static GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
    public static GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

    public static UPDATE_SETTINGS = 'UPDATE_SETTINGS';
    public static UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
    public static UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

    constructor(protected store: Store<SettingsAppState>) { }

    public cancelAction = (): void => {
        // TODO: Implement this?
        throw new Error('This method has not been implemented');
    }

    public get(packagePath: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: SettingsActions.GET_SETTINGS,
            payload: {
                packagePath,
            }
        })));
    }

    public update = (settings: LocalObject<any, unknown>, packagePath: string) => {

        const queueItems = [
            new QueueItem({
                message: `SETTINGS.QUEUE.UPDATING`,
                messageParams: {},
                link: `${packagePath}/settings`,
                packagePath,
                localObject: settings,
                cancelAction: this.cancelAction
            })
        ];

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<LocalObject<any, unknown>, HttpResponse, LocalObject<any, unknown>>>({
            type: SettingsActions.UPDATE_SETTINGS,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<LocalObject<any, unknown>, HttpResponse, LocalObject<any, unknown>>(
                    new Effect<LocalObject<any, unknown>>(new EffectRequest<LocalObject<any, unknown>>(
                        packagePath + '/settings',
                        HttpMethod.PUT,
                        settings
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<any, unknown>>>({
                        type: SettingsActions.UPDATE_SETTINGS_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: settings,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<any, unknown>>>({
                        type: SettingsActions.UPDATE_SETTINGS_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: settings,
                            queueItems
                        }
                    })
                )
            )
        })));
    }
}
