import { RecordActionsBase } from '@skysmack/redux';
import { ConnectionsAppState } from '../connections/connections-reducer';
import { Store } from 'redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS } from '../../constants/constants';
import { Connection, ConnectionKey } from '../../models/connection';
import { TerminalStatusChangedMessage } from '../../signal-r/terminal-status-changed-message';

export class ConnectionsActions extends RecordActionsBase<ConnectionsAppState, Store<ConnectionsAppState>> {
    public static TERMINAL_STATUS_CHANGED_MESSAGE = 'TERMINAL_STATUS_CHANGED_MESSAGE';

    constructor(protected store: Store<ConnectionsAppState>) { super(store, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS); }

    public terminalStatusChangedMessage(packagePath: string, message: TerminalStatusChangedMessage) {
        this.store.dispatch({
            type: this.prefix + ConnectionsActions.TERMINAL_STATUS_CHANGED_MESSAGE,
            payload: { packagePath, message }
        })
    }

    public getMessageParams(record: LocalObject<Connection, ConnectionKey>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}