import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Lodging } from './../models/lodging';

/**
 * This is to be used when you want to access lodgings via the GLOBAL state. E.g. state.lodgings (where lodgings is the reducer name.)
 */
export class LodgingsAppState extends AppState {
    public Lodgings: LodgingsState;
}

export class LodgingsState implements DocumentRecordState<Lodging, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Lodging>>> = {};
    public fields: StrIndex<LocalObject<FieldSchemaViewModel>[]> = {};
    public availableFields: StrIndex<FieldValueProviderViewModel[]> = {};
}

export function lodgingsReducer(state = new LodgingsState(), action: ReduxAction, prefix: string = 'LODGINGS_'): LodgingsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<LodgingsState, Lodging, number>(state, action, prefix)
            };
    }
}
