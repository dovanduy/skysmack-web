import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { ClientsAppState } from './clients-reducer';
import { CLIENTS_REDUX_KEY, CLIENTS_ADDITIONAL_PATHS } from '../../constants/constants';
import { Client } from '../../models/client';

export class ClientsActions extends RecordActionsBase<ClientsAppState, Store<ClientsAppState>> {
    public static CLIENT_ONLINE_STATUS_MESSAGE = 'CLIENT_ONLINE_STATUS_MESSAGE';

    constructor(protected store: Store<ClientsAppState>) { super(store, CLIENTS_REDUX_KEY, CLIENTS_ADDITIONAL_PATHS); }

    public clientOnlineStatusMessage(packagePath: string, clientId: number, online: boolean) {
        this.store.dispatch({
            type: this.prefix + ClientsActions.CLIENT_ONLINE_STATUS_MESSAGE,
            payload: { packagePath, clientId, online }
        })
    }

    public getMessageParams(record: LocalObject<Client, number>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}
