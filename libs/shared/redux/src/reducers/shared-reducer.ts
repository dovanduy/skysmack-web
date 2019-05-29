import { AuthenticationActions } from '../authentication/authentication-actions';
import { REHYDRATE } from 'redux-persist/constants';
import { LocalObject, toLocalObject, StrIndex } from '@skysmack/framework';

export function sharedReducer(state: any, action: any, initialState: any, reduxArea: string): any {
    state = Object.freeze(state);

    switch (action.type) {
        case REHYDRATE: {
            const newState = { ...action.payload[reduxArea] };
            if (newState && newState.localRecords) {
                Object.keys(newState.localRecords).map(packagePath => {
                    const localRecords: StrIndex<LocalObject<any, any>> = newState.localRecords[packagePath];
                    Object.keys(localRecords).map(localRecordKey => {
                        const localRecord: LocalObject<any, any> = localRecords[localRecordKey];
                        const initiatedLocalRecord = localRecord.objectIdentifier ? localRecord : toLocalObject(
                            localRecord.object,
                            localRecord._identifier,
                            localRecord.localId,
                            localRecord.status,
                            localRecord.modifyType,
                            localRecord.isNew,
                            localRecord.foreignKey,
                            localRecord.error
                        );
                        localRecords[localRecordKey] = initiatedLocalRecord
                    });
                });

                return { ...state, ...newState };
            } else {
                return state;
            }
        }
        case AuthenticationActions.LOG_OUT: {
            return initialState;
        }
        default:
            return state;
    }
}
