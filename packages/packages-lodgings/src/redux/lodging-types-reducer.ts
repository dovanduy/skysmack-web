import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { LodgingType } from '../models/lodging-type';

/**
 * This is to be used when you want to access lodgingsTypes via the GLOBAL state. E.g. state.lodgingsTypes (where lodgingsTypes is the reducer name.)
 */
export class LodgingTypesAppState extends AppState {
    public LodgingsTypes: LodgingTypesState;
}

export class LodgingTypesState implements RecordState<LodgingType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingType, number>>> = {};
}

export function lodgingTypesReducer(state = new LodgingTypesState(), action: ReduxAction, prefix: string = 'LODGING_TYPES_'): LodgingTypesState {
    state = sharedReducer(state, action, new LodgingTypesState());
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<LodgingTypesState, LodgingType, number>(state, action, prefix)
            };
    }
}
