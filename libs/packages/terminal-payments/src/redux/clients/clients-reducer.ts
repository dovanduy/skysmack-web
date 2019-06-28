import { LocalPageTypes, StrIndex, LocalObject, reinstantiateLocalRecord } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Client } from '../../models/index';
import { CLIENTS_REDUX_KEY, CLIENTS_REDUCER_KEY } from '../../constants';
import { ClientsActions } from './clients-actions';

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
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + ClientsActions.CLIENT_ONLINE_STATUS_MESSAGE: {
            const castedAction = action as ReduxAction<{ packagePath: string, clientId: number, online: boolean }>;
            const area = newState.localRecords[castedAction.payload.packagePath];
            const localRecordId = Object.keys(area).find(key => area[key].object.id === castedAction.payload.clientId);
            const newLocalRecord = reinstantiateLocalRecord({ ...area[localRecordId] });
            newLocalRecord.object.online = castedAction.payload.online;
            newLocalRecord.localId = area[localRecordId].localId;
            area[localRecordId] = newLocalRecord;
            newState.localRecords[castedAction.payload.packagePath] = area;

            return newState;
        }

        default:
            return {
                ...state,
                ...recordReducersBase<ClientsState, Client, number>(state, action, prefix)
            };
    }
}
