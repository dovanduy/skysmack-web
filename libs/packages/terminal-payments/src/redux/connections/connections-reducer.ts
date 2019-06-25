import { LocalPageTypes, StrIndex, LocalObject, reinstantiateLocalRecord } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Connection, ConnectionKey } from '../../models/index';
import { CONNECTIONS_REDUX_KEY, CONNECTIONS_REDUCER_KEY } from '../../constants';
import { ConnectionsActions } from '../clients/connections-actions';
import { TerminalStatusChangedMessage } from '../../signal-r/terminal-status-changed-message';

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
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + ConnectionsActions.TERMINAL_STATUS_CHANGED_MESSAGE: {
            const castedAction = action as ReduxAction<{ packagePath: string, message: TerminalStatusChangedMessage }>;
            const message = castedAction.payload.message;
            const area = newState.localRecords[castedAction.payload.packagePath];
            const localRecordId = Object.keys(area).find(key => {
                const clientIdMatch = area[key].object.id.clientId === message.clientId;
                const terminalIdMatch = area[key].object.id.terminalId === message.terminalId;
                return (clientIdMatch && terminalIdMatch) ? true : false;
            });
            const newLocalRecord = reinstantiateLocalRecord(area[localRecordId]) as LocalObject<Connection, ConnectionKey>;

            newLocalRecord.localId = localRecordId;
            newLocalRecord.object.status = message.terminalStatus;
            area[localRecordId] = newLocalRecord;
            newState.localRecords[castedAction.payload.packagePath] = area;

            return newState;
        }
        default:
            return {
                ...state,
                ...recordReducersBase<ConnectionsState, Connection, ConnectionKey>(state, action, prefix)
            };
    }
}
