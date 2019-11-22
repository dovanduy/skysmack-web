import { StrIndex, GlobalProperties } from '@skysmack/framework';
import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { CORS_REDUX_KEY, CORS_REDUCER_KEY } from '../../constants/constants';
import { CorsActions } from '../../actions';

/**
 * This is to be used when you want to access cors via the GLOBAL state. E.g. state.cors (where cors is the reducer name.)
 */
export class CorsAppState extends AppState {
    public cors: CorsState;
}

export class CorsState {
    public domains: StrIndex<string[]> = {};
}

export function corsReducer(state = new CorsState(), action: any, prefix: string = CORS_REDUX_KEY): CorsState {
    state = sharedReducer(state, action, new CorsState(), CORS_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + CorsActions.GET_DOMAINS_SUCCESS: {
            const castedAction: ReduxAction<{ packagePath: string, domains: string[] }> = action;
            const { domains, packagePath } = castedAction.payload;
            newState.domains[packagePath] = newState.domains[packagePath] ? newState.domains[packagePath] : [];
            newState.domains[packagePath] = newState.domains[packagePath].concat(domains ? domains : []).filter((value, index, self) => self.indexOf(value) === index);
            return newState;
        }
        case prefix + CorsActions.GET_DOMAINS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return newState;
        }

        case prefix + CorsActions.PUT_DOMAINS_SUCCESS: {
            const castedAction: ReduxAction<{ packagePath: string, domains: string[] }> = action;
            const { domains, packagePath } = castedAction.payload;
            newState.domains[packagePath] = newState.domains[packagePath] && newState.domains[packagePath].concat(domains ? domains : []).filter((value, index, self) => self.indexOf(value) === index);
            return newState;
        }
        case prefix + CorsActions.PUT_DOMAINS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return newState;
        }

        case prefix + CorsActions.DELETE_DOMAINS_SUCCESS: {
            const castedAction: ReduxAction<{ packagePath: string, domains: string[] }> = action;
            const { domains, packagePath } = castedAction.payload;
            newState.domains[packagePath] = newState.domains[packagePath] && newState.domains[packagePath].filter(currentDomain => !domains.includes(currentDomain));
            return newState;
        }
        case prefix + CorsActions.DELETE_DOMAINS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return newState;
        }
        default:
            return state;
    }
}
