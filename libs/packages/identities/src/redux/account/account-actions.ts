import { Store } from 'redux';

export class AccountActions<TStateType, TStore extends Store<TStateType>> /* implements EntityActions<Package, string> */ {
    constructor(
        protected store: TStore,
    ) { }
}
