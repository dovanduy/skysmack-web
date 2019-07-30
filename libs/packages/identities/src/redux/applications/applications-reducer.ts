import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Application } from '../../models/application';
import { APPLICATIONS_REDUCER_KEY, APPLICATIONS_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access applications via the GLOBAL state. E.g. state.applications (where applications is the reducer name.)
 */
export class ApplicationsAppState extends AppState {
    public applications: ApplicationsState;
}

export class ApplicationsState implements RecordState<Application, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Application, number>>> = {};
}

export function applicationsReducer(state = new ApplicationsState(), action: ReduxAction, prefix: string = APPLICATIONS_REDUX_KEY): ApplicationsState {
    state = sharedReducer(state, action, new ApplicationsState(), APPLICATIONS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<ApplicationsState, Application, number>(state, action, prefix)
            };
    }
}
