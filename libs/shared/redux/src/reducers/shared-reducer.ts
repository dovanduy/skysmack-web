import { AuthenticationActions } from '../authentication/authentication-actions';
import { REHYDRATE } from 'redux-persist/constants';
import { LocalObject, toLocalObject, StrIndex } from '@skysmack/framework';

const reinstantiateLocalRecord = (localRecord: LocalObject<any, any>) => {
    return localRecord.objectIdentifier ? localRecord : toLocalObject(
        localRecord.object,
        localRecord._identifier,
        localRecord.localId,
        localRecord.status,
        localRecord.modifyType,
        localRecord.isNew,
        localRecord.foreignKey,
        localRecord.error
    );
}

export function sharedReducer(state: any, action: any, initialState: any, reduxArea: string): any {
    state = Object.freeze(state);

    switch (action.type) {
        case REHYDRATE: { // Reinstantiate localRecords so their functions gets defined agian.
            const newState = { ...action.payload[reduxArea] };
            const propNames = [ // Make into sharedReducer param, then update AAAAAAALL the reducers ;_; - or make a default :D
                'localRecords'
            ];

            const localObjectsToReinstantiate = Object.keys(newState).map(key => {
                return propNames.includes(key) ? key : undefined
            }).filter(x => x);

            if (newState && localObjectsToReinstantiate.length > 0) {
                localObjectsToReinstantiate.map(propName => {
                    if (propName === 'localRecords') {
                        Object.keys(newState.localRecords).map(packagePath => {
                            const localRecords: StrIndex<LocalObject<any, any>> = newState.localRecords[packagePath];
                            Object.keys(localRecords).map(localRecordKey => {
                                localRecords[localRecordKey] = reinstantiateLocalRecord(localRecords[localRecordKey])
                            });
                        });
                    } else {
                        // If not localRecords
                    }
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
