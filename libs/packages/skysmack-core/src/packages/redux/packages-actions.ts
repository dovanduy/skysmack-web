import { Store } from 'redux';
import { ReduxAction, RecordActionsBase, ReduxOfflineMeta, OfflineMeta, Effect, EffectRequest, CommitMeta, RollbackMeta } from '@skysmack/redux';
import { Package, LocalObject, StrIndex, QueueItem, HttpResponse, HttpMethod } from '@skysmack/framework';
import { PackagesAppState } from './packages-reducer';
import { PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS } from '../constants/constants';

export class PackagesActions extends RecordActionsBase<PackagesAppState, Store<PackagesAppState>> {
    public static GET_AVAILABLE_PACKAGES = 'GET_AVAILABLE_PACKAGES';
    public static GET_AVAILABLE_PACKAGES_SUCCESS = 'GET_AVAILABLE_PACKAGES_SUCCESS';
    public static GET_AVAILABLE_PACKAGES_FAILURE = 'GET_AVAILABLE_PACKAGES_FAILURE';

    public static EDIT_PACKAGE_PATH

    protected identifier = 'path';

    constructor(protected store: Store<PackagesAppState>) { super(store, PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS); }

    public getAvailablePackages(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<string>({
            type: PackagesActions.GET_AVAILABLE_PACKAGES,
            payload: packagePath
        })));
    }

    public editPackagePath = (_package: LocalObject<Package, string>, packagePath: string) => {
        const queueItems = [new QueueItem({
            message: `PACKAGES.EDITING_PATH`,
            messageParams: { path: _package.object.path } as any,
            link: `${this.addAdditionalPaths(packagePath)}/edit/path`,
            packagePath,
            localObject: _package,
            cancelAction: this.cancelAction
        })];

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<string, HttpResponse, string>>({
            type: this.prefix + PackagesActions.EDIT_PACKAGE_PATH,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<string, HttpResponse, string>(
                    new Effect<string>(new EffectRequest<string>(
                        this.addAdditionalPaths(packagePath),
                        HttpMethod.PUT,
                        _package.object.path
                    )),
                    new ReduxAction<any, CommitMeta<string>>({
                        type: this.prefix + RecordActionsBase.ADD_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: _package.object.path,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<string>>({
                        type: this.prefix + RecordActionsBase.ADD_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: _package.object.path,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public getMessageParams(_package: LocalObject<Package, string>): StrIndex<string> {
        return {
            name: _package.object.name
        };
    };
}
