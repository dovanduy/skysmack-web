import { Store, Action } from 'redux';

export class SkysmackActions {
    public static GET_SKYSMACK = 'GET_SKYSMACK';
    public static GET_SKYSMACK_SUCCESS = 'GET_SKYSMACK_SUCCESS';
    public static GET_SKYSMACK_FAILURE = 'GET_SKYSMACK_FAILURE';

    public static GET_PACKAGE_PERMISSIONS = 'GET_PACKAGE_PERMISSIONS';
    public static GET_PACKAGE_PERMISSIONS_SUCCESS = 'GET_PACKAGE_PERMISSIONS_SUCCESS';
    public static GET_PACKAGE_PERMISSIONS_FAILURE = 'GET_PACKAGE_PERMISSIONS_FAILURE';

    public static GET_AVAILABLE_PACKAGE_PERMISSIONS = 'GET_AVAILABLE_PACKAGE_PERMISSIONS';
    public static GET_AVAILABLE_PACKAGE_PERMISSIONS_SUCCESS = 'GET_AVAILABLE_PACKAGE_PERMISSIONS_SUCCESS';
    public static GET_AVAILABLE_PACKAGE_PERMISSIONS_FAILURE = 'GET_AVAILABLE_PACKAGE_PERMISSIONS_FAILURE';

    constructor(protected reduxStore: Store<any>) { }

    public getSkysmack(): Action {
        return this.reduxStore.dispatch({ type: SkysmackActions.GET_SKYSMACK } as Action);
    }

    public getPermissions(packagePath: string): Action {
        return this.reduxStore.dispatch({
            type: SkysmackActions.GET_PACKAGE_PERMISSIONS,
            payload: packagePath
        } as Action);
    }

    public getAvailablePermissions(packagePath: string): Action {
        return this.reduxStore.dispatch({
            type: SkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS,
            payload: packagePath
        } as Action);
    }
}
