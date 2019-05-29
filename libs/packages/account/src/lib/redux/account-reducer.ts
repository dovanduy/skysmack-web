import { AppState, sharedReducer } from '@skysmack/redux';
import { ACCOUNTS_REDUCER_KEY } from '../constants';

/**
 * This is to be used when you want to access account via the GLOBAL state. E.g. state.account (where account is the reducer name.)
 */
export class AccountAppState extends AppState {
    public account: AccountState;
}

export class AccountState {
}

export function accountReducer(state = new AccountState(), action: any): AccountState {
    state = sharedReducer(state, action, new AccountState(), ACCOUNTS_REDUCER_KEY);

    switch (action.type) {
        default:
            return state;
    }
}

