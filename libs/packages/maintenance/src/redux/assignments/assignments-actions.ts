import { Store } from 'redux';
import { ReduxAction } from '@skysmack/redux';

export class AssignmentsActions {
    public static ASSIGNMENTS_GET = 'ASSIGNMENTS_GET';
    public static ASSIGNMENTS_GET_SUCCESS = 'ASSIGNMENTS_GET_SUCCESS';
    public static ASSIGNMENTS_GET_FAILURE = 'ASSIGNMENTS_GET_FAILURE';

    constructor(
        protected store: Store,
    ) { }

    public get = (from: Date, to: Date) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<{ from: Date, to: Date }>({
            type: AssignmentsActions.ASSIGNMENTS_GET,
            payload: { from, to }
        })));
    }
}