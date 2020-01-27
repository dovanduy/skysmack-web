import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { ACCESS_POINTS_REDUX_KEY, ACCESS_POINTS_REDUCER_KEY } from '../constants/constants';
import { AccessPoint, } from '../models/access-point';

/**
 * This is to be used when you want to access access-points via the GLOBAL state. E.g. state.access-points (where access-points is the reducer name.)
 */
export class AccessPointsAppState extends AppState {
    public accessPoints: AccessPointsState;
}

export class AccessPointsState implements RecordState<AccessPoint, string> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<string>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AccessPoint, string>>> = {};
}

export function accessPointsReducer(state = new AccessPointsState(), action: ReduxAction, prefix: string = ACCESS_POINTS_REDUX_KEY): AccessPointsState {
    state = sharedReducer(state, action, new AccessPointsState(), ACCESS_POINTS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AccessPointsState, AccessPoint, string>(state, action, prefix)
            };
    }
}
