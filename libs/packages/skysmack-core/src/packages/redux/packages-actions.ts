import { Store } from 'redux';
import { ReduxAction, RecordActionsBase, ReduxOfflineMeta, OfflineMeta, Effect, EffectRequest, CommitMeta, RollbackMeta } from '@skysmack/redux';
import { Package, LocalObject, StrIndex, QueueItem, HttpResponse, HttpMethod } from '@skysmack/framework';
import { PackagesAppState } from './packages-reducer';
import { PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS } from '../constants/constants';
import { ChangePackagePath } from '../models/change-package-path';

export class PackagesActions extends RecordActionsBase<PackagesAppState, Store<PackagesAppState>> {
    public static GET_AVAILABLE_PACKAGES = 'GET_AVAILABLE_PACKAGES';
    public static GET_AVAILABLE_PACKAGES_SUCCESS = 'GET_AVAILABLE_PACKAGES_SUCCESS';
    public static GET_AVAILABLE_PACKAGES_FAILURE = 'GET_AVAILABLE_PACKAGES_FAILURE';

    public static EDIT_PACKAGE_PATH = 'EDIT_PACKAGE_PATH';
    public static EDIT_PACKAGE_PATH_SUCCESS = 'EDIT_PACKAGE_PATH_SUCCESS';
    public static EDIT_PACKAGE_PATH_FAILURE = 'EDIT_PACKAGE_PATH_FAILURE';

    protected identifier = 'path';

    constructor(protected store: Store<PackagesAppState>) { super(store, PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS); }

    public getAvailablePackages(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<string>({
            type: PackagesActions.GET_AVAILABLE_PACKAGES,
            payload: packagePath
        })));
    }

    public changePath = (_changePackagePaths: ChangePackagePath[], packagePath: string) => {
        const queueItems = _changePackagePaths.map(record => {
            return new QueueItem({
                message: `PACKAGES.EDITING_PATH`,
                messageParams: { path: record.previousPath } as any,
                link: `${this.addAdditionalPaths(packagePath)}/edit/path/${record.previousPath}`,
                packagePath,
                cancelAction: this.cancelAction
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<ChangePackagePath[], HttpResponse, ChangePackagePath[]>>({
            type: this.prefix + PackagesActions.EDIT_PACKAGE_PATH,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<ChangePackagePath[], HttpResponse, ChangePackagePath[]>(
                    new Effect<ChangePackagePath[]>(new EffectRequest<ChangePackagePath[]>(
                        `${packagePath}/change-path`,
                        HttpMethod.PUT,
                        _changePackagePaths
                    )),
                    new ReduxAction<any, CommitMeta<ChangePackagePath[]>>({
                        type: PackagesActions.EDIT_PACKAGE_PATH_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: _changePackagePaths,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<ChangePackagePath[]>>({
                        type: PackagesActions.EDIT_PACKAGE_PATH_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: _changePackagePaths,
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
