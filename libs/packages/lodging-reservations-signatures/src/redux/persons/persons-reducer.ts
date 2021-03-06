import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Person } from '../../models/person';
import { sharedReducer } from '@skysmack/redux';
import { PERSONS_REDUX_KEY, PERSONS_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class PersonsAppState extends AppState {
    public persons: PersonsState;
}

export class PersonsState implements RecordState<Person, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Person, number>>> = {};
}

export function personsReducer(state = new PersonsState(), action: ReduxAction, prefix: string = PERSONS_REDUX_KEY): PersonsState {
    state = sharedReducer(state, action, new PersonsState(), PERSONS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PersonsState, Person, number>(state, action, prefix)
            };
    }
}
