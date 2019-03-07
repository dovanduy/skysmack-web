import { HttpMethod, HttpResponse, LocalObject, QueueItem } from '@skysmack/framework';
import { ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta, CommitMeta, RollbackMeta, PackagePathPayload } from '@skysmack/redux';
import { Store } from 'redux';
import { IdentitiesSettings } from '../models';
import { IdentitiesSettingsAppState } from './identities-settings-reducer';

export class IdentitiesSettingsActions {
    public static GET_IDENTITY_SETTINGS = 'GET_IDENTITY_SETTINGS';
    public static GET_IDENTITY_SETTINGS_SUCCESS = 'GET_IDENTITY_SETTINGS_SUCCESS';
    public static GET_IDENTITY_SETTINGS_FAILURE = 'GET_IDENTITY_SETTINGS_FAILURE';

    public static UPDATE_IDENTITY_SETTINGS = 'UPDATE_IDENTITY_SETTINGS';
    public static UPDATE_IDENTITY_SETTINGS_SUCCESS = 'UPDATE_IDENTITY_SETTINGS_SUCCESS';
    public static UPDATE_IDENTITY_SETTINGS_FAILURE = 'UPDATE_IDENTITY_SETTINGS_FAILURE';

    constructor(protected store: Store<IdentitiesSettingsAppState>) { }

    public cancelAction = (): void => {
        // TODO: Implement this?
        throw new Error('This method has not been implemented');
    }

    public get(packagePath: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: IdentitiesSettingsActions.GET_IDENTITY_SETTINGS,
            payload: {
                packagePath,
            }
        })));
    }

    public update = (settings: LocalObject<IdentitiesSettings, unknown>, packagePath: string) => {

        const queueItems = [
            new QueueItem({
                message: `IDENTITIES_SETTINGS.QUEUE.UPDATING`,
                messageParams: {},
                link: `${packagePath}/settings`,
                packagePath,
                localObject: settings,
                cancelAction: this.cancelAction
            })
        ];

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<LocalObject<IdentitiesSettings, unknown>, HttpResponse, LocalObject<IdentitiesSettings, unknown>>>({
            type: IdentitiesSettingsActions.UPDATE_IDENTITY_SETTINGS,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<LocalObject<IdentitiesSettings, unknown>, HttpResponse, LocalObject<IdentitiesSettings, unknown>>(
                    new Effect<LocalObject<IdentitiesSettings, unknown>>(new EffectRequest<LocalObject<IdentitiesSettings, unknown>>(
                        packagePath + '/settings',
                        HttpMethod.PUT,
                        settings
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<IdentitiesSettings, unknown>>>({
                        type: IdentitiesSettingsActions.UPDATE_IDENTITY_SETTINGS_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: settings,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<IdentitiesSettings, unknown>>>({
                        type: IdentitiesSettingsActions.UPDATE_IDENTITY_SETTINGS_FAILURE,
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
