import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Basket } from './../models/basket';
import { sharedReducer } from '@skysmack/redux';

/**
 * This is to be used when you want to access baskets via the GLOBAL state. E.g. state.baskets (where baskets is the reducer name.)
 */
export class BasketsAppState extends AppState {
    public baskets: BasketsState;
}

export class BasketsState implements DocumentRecordState<Basket, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Basket, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function basketsReducer(state = new BasketsState(), action: ReduxAction, prefix: string = 'BASKETS_'): BasketsState {
    state = sharedReducer(state, action, new BasketsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<BasketsState, Basket, number>(state, action, prefix)
            };
    }
}
