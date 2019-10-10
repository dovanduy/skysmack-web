import { Store } from 'redux';
import { ReduxAction } from '@skysmack/redux';

export class AssignmentsActions {
    public static ASSIGNMENTS_GET = 'ASSIGNMENTS_GET';
    public static ASSIGNMENTS_GET_SUCCESS = 'ASSIGNMENTS_GET_SUCCESS';
    public static ASSIGNMENTS_GET_FAILURE = 'ASSIGNMENTS_GET_FAILURE';

    constructor(
        protected store: Store,
    ) { }

    public get = (packagePath: string, from: Date, due: Date) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<{ packagePath: string, from: Date, due: Date }>({
            type: AssignmentsActions.ASSIGNMENTS_GET,
            payload: { packagePath, from, due }
        })));
    }
}