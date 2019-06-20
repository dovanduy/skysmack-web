import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Client } from '../../models/index';
import { CLIENTS_REDUX_KEY, CLIENTS_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access clients via the GLOBAL state. E.g. state.clients (where clients is the reducer name.)
 */
export class ClientsAppState extends AppState {
    public clients: ClientsState;
}

export class ClientsState implements RecordState<Client, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Client, number>>> = {};
}

export function clientsReducer(state = new ClientsState(), action: ReduxAction, prefix: string = CLIENTS_REDUX_KEY): ClientsState {
    state = sharedReducer(state, action, new ClientsState(), CLIENTS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<ClientsState, Client, number>(state, action, prefix)
            };
    }
}
