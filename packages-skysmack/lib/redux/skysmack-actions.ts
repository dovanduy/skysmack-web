import { Store, Action } from 'redux';

export class SkysmackActions {
    public static GET_CURRENT_TENANT = 'GET_CURRENT_TENANT';
    public static GET_CURRENT_TENANT_SUCCESS = 'GET_CURRENT_TENANT_SUCCESS';

    constructor(protected reduxStore: Store<any>) { }

    public getCurrentTenant(): Action {
        return this.reduxStore.dispatch({ type: SkysmackActions.GET_CURRENT_TENANT } as Action);
    }
}
