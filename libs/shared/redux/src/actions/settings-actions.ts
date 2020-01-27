import { Store } from 'redux';
import { EffectRequest, Effect } from '../models';
import { SettingsAppState } from '../reducers/settings-reducer';
import { ReduxAction } from '../action-types/redux-action';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { OfflineMeta } from '../metas/offline-redux/offline-meta';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';
import { HttpResponse, LocalObject, QueueItem, HttpMethod } from '@skysmack/framework';
import { GetSettingsPayload } from '../payloads';
import { SettingsCommitMeta } from '../metas/settings/settings-commit-meta';

export class SettingsActions {
    public static GET_SETTINGS = 'GET_SETTINGS';
    public static GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
    public static GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

    public static UPDATE_SETTINGS = 'UPDATE_SETTINGS';
    public static UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
    public static UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

    constructor(protected store: Store<SettingsAppState<unknown>>) { }

    public get(packagePath: string, settingKey: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetSettingsPayload>({
            type: SettingsActions.GET_SETTINGS,
            payload: {
                packagePath,
                settingKey
            }
        })));
    }

    public update = (settings: LocalObject<any, unknown>, packagePath: string, settingsKey: string) => {
        const updatedSettingsKey = settingsKey === 'default' ? undefined : settingsKey;
        let url = `${packagePath}/settings`;
        url = updatedSettingsKey ? `${url}/${updatedSettingsKey}` : url;

        const queueItems = [
            new QueueItem({
                message: `SETTINGS.QUEUE.UPDATING`,
                messageParams: {},
                link: url,
                packagePath,
                localObject: settings
            })
        ];

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<LocalObject<any, unknown>, HttpResponse, LocalObject<any, unknown>>>({
            type: SettingsActions.UPDATE_SETTINGS,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<LocalObject<any, unknown>, HttpResponse, LocalObject<any, unknown>>(
                    new Effect<LocalObject<any, unknown>>(new EffectRequest<LocalObject<any, unknown>>(
                        url,
                        HttpMethod.PUT,
                        settings.object
                    )),
                    new ReduxAction<any, SettingsCommitMeta<LocalObject<any, unknown>>>({
                        type: SettingsActions.UPDATE_SETTINGS_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: settings,
                            queueItems,
                            settingsKey
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<any, unknown>>>({
                        type: SettingsActions.UPDATE_SETTINGS_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: settings,
                            queueItems
                        } as any
                    })
                )
            )
        })));
    }
}
