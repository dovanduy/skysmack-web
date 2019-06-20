import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Connection, ConnectionKey } from '../../models/index';
import { CONNECTIONS_REDUX_KEY, CONNECTIONS_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access connections via the GLOBAL state. E.g. state.connections (where connections is the reducer name.)
 */
export class ConnectionsAppState extends AppState {
    public connections: ConnectionsState;
}

export class ConnectionsState implements RecordState<Connection, ConnectionKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<ConnectionKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Connection, ConnectionKey>>> = {};
}

export function connectionsReducer(state = new ConnectionsState(), action: ReduxAction, prefix: string = CONNECTIONS_REDUX_KEY): ConnectionsState {
    state = sharedReducer(state, action, new ConnectionsState(), CONNECTIONS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<ConnectionsState, Connection, ConnectionKey>(state, action, prefix)
            };
    }
}
