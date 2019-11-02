import { AuthenticationActions } from '../authentication/authentication-actions';
import { REHYDRATE } from 'redux-persist/constants';
import { LocalObject, StrIndex, reinstantiateLocalRecord } from '@skysmack/framework';

const loopPackageDictionary = (newState: any, selector: string) => {
    Object.keys(newState[selector]).map(packagePath => {
        const localRecords: StrIndex<LocalObject<any, any>> = newState[selector][packagePath];
        if (localRecords) {
            Object.keys(localRecords).forEach(localRecordKey => {
                localRecords[localRecordKey] = reinstantiateLocalRecord(localRecords[localRecordKey]);
            });
        }
    });
}

export function sharedReducer(state: any, action: any, initialState: any, reduxArea: string, stateKeysContainingLocalObjects: string[] = ['localRecords']): any {
    state = Object.freeze(state);

    switch (action.type) {
        case REHYDRATE: { // Reinstantiate localRecords so their functions get defined again.
            const newState = { ...action.payload[reduxArea] };


            const stateKeysToReinstantiate = Object.keys(newState).map(key => {
                return stateKeysContainingLocalObjects.includes(key) ? key : undefined
            }).filter(x => x);

            if (newState && stateKeysToReinstantiate.length > 0) {
                stateKeysToReinstantiate.map(stateKey => {
                    if (stateKey === 'localRecords') {
                        loopPackageDictionary(newState, 'localRecords');
                    } else if (stateKey === 'availablePackages') {
                        loopPackageDictionary(newState, 'availablePackages');
                    } else if (stateKey === 'availableFields') {
                        loopPackageDictionary(newState, 'availableFields');
                    } else {
                        Object.keys(newState[stateKey]).forEach(localRecordKey => {
                            newState[stateKey][localRecordKey] = reinstantiateLocalRecord(newState[stateKey][localRecordKey])
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
