import { Store } from 'redux';
import { ReduxAction, RecordActionsBase } from '@skysmack/redux';
import { Package, LocalObject, StrIndex } from '@skysmack/framework';
import { PackagesAppState } from './packages-reducer';
import { PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS } from '../constants/constants';

export class PackagesActions extends RecordActionsBase<PackagesAppState, Store<PackagesAppState>> {
    public static GET_AVAILABLE_PACKAGES = 'GET_AVAILABLE_PACKAGES';
    public static GET_AVAILABLE_PACKAGES_SUCCESS = 'GET_AVAILABLE_PACKAGES_SUCCESS';
    public static GET_AVAILABLE_PACKAGES_FAILURE = 'GET_AVAILABLE_PACKAGES_FAILURE';

    constructor(protected store: Store<PackagesAppState>) { super(store, PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS); }

    public getAvailablePackages(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<string>({
            type: PackagesActions.GET_AVAILABLE_PACKAGES,
            payload: packagePath
        })));
    }

    public getMessageParams(_package: LocalObject<Package, string>): StrIndex<string> {
        return {
            name: _package.object.name
        };
    };
}
