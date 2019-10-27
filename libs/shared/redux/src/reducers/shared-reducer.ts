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

            if (newState) {
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
                }
                return { ...state, ...newState };
            }
            return state;
        }
        case AuthenticationActions.LOG_OUT: {
            return initialState;
        }
        default:
            return state;
    }


}
