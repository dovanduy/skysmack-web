import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Basket } from './../models/basket';
import { sharedReducer } from '@skysmack/redux';

/**
 * This is to be used when you want to access baskets via the GLOBAL state. E.g. state.baskets (where baskets is the reducer name.)
 */
export class BasketsAppState extends AppState {
    public baskets: BasketsState;
}

export class BasketsState implements RecordState<Basket, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Basket, number>>> = {};
}

export function basketsReducer(state = new BasketsState(), action: ReduxAction, prefix: string = 'BASKETS_'): BasketsState {
    state = sharedReducer(state, action, new BasketsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<BasketsState, Basket, number>(state, action, prefix)
            };
    }
}
