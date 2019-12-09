import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { LODGINGS_DOORWAYS_REDUX_KEY, LODGINGS_DOORWAYS_REDUCER_KEY } from '../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';

/**
 * This is to be used when you want to access lodgings-doorways via the GLOBAL state. E.g. state.lodgings-doorways (where lodgings-doorways is the reducer name.)
 */
export class LodgingsDoorwaysAppState extends AppState {
    public lodgingsDoorways: LodgingsDoorwaysState;
}

export class LodgingsDoorwaysState implements RecordState<LodgingDoorway, LodgingDoorwayKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<LodgingDoorwayKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingDoorway, LodgingDoorwayKey>>> = {};
}

export function lodgingsDoorwaysReducer(state = new LodgingsDoorwaysState(), action: ReduxAction, prefix: string = LODGINGS_DOORWAYS_REDUX_KEY): LodgingsDoorwaysState {
    state = sharedReducer(state, action, new LodgingsDoorwaysState(), LODGINGS_DOORWAYS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<LodgingsDoorwaysState, LodgingDoorway, LodgingDoorwayKey>(state, action, prefix)
            };
    }
}
