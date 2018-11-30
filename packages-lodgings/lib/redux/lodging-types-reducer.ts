import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { LodgingTypes } from '../models/lodging-types';

/**
 * This is to be used when you want to access lodgingsTypes via the GLOBAL state. E.g. state.lodgingsTypes (where lodgingsTypes is the reducer name.)
 */
export class LodgingTypesAppState extends AppState {
    public LodgingsTypes: LodgingTypesState;
}

export class LodgingTypesState implements DocumentRecordState<LodgingTypes, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingTypes>>> = {};
    public fields: StrIndex<LocalObject<FieldSchemaViewModel>[]> = {};
    public availableFields: StrIndex<FieldValueProviderViewModel[]> = {};
}

export function lodgingTypesReducer(state = new LodgingTypesState(), action: ReduxAction, prefix: string = 'LODGING.TYPES_'): LodgingTypesState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<LodgingTypesState, LodgingTypes, number>(state, action, prefix)
            };
    }
}
