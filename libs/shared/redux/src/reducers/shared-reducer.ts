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

const loopPackageDictionary = (newState: any, selector: string) => {
    Object.keys(newState[selector]).map(packagePath => {
        const localRecords: StrIndex<LocalObject<any, any>> = newState[selector][packagePath];
        Object.keys(localRecords).forEach(localRecordKey => {
            localRecords[localRecordKey] = reinstantiateLocalRecord(localRecords[localRecordKey]);
        });
    });
}

export function sharedReducer(state: any, action: any, initialState: any, reduxArea: string, stateKeysContainingLocalObjects: string[] = ['localRecords']): any {
    state = Object.freeze(state);

    switch (action.type) {
        case REHYDRATE: { // Reinstantiate localRecords so their functions get defined again.
            const newState = { ...action.payload[reduxArea] };

            const localObjectsToReinstantiate = Object.keys(newState).map(key => {
                return stateKeysContainingLocalObjects.includes(key) ? key : undefined
            }).filter(x => x);

            if (newState && localObjectsToReinstantiate.length > 0) {
                localObjectsToReinstantiate.map(propName => {
                    if (propName === 'localRecords') {
                        loopPackageDictionary(newState, 'localRecords');
                    } else if (propName === 'availablePackages') {
                        loopPackageDictionary(newState, 'availablePackages');
                    } else {
                        Object.keys(newState[propName]).forEach(localRecordKey => {
                            newState[propName][localRecordKey] = reinstantiateLocalRecord(newState[propName][localRecordKey])
                        });
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
