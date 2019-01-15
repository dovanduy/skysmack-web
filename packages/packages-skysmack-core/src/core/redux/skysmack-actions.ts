import { Store, Action } from 'redux';

export class SkysmackActions {
    public static GET_SKYSMACK = 'GET_SKYSMACK';
    public static GET_SKYSMACK_SUCCESS = 'GET_SKYSMACK_SUCCESS';
    public static GET_SKYSMACK_FAILURE = 'GET_SKYSMACK_FAILURE';

    constructor(protected reduxStore: Store<any>) { }

    public getSkysmack(): Action {
        return this.reduxStore.dispatch({ type: SkysmackActions.GET_SKYSMACK } as Action);
    }
}
