import { recordReducersBase, RecordState, PackageRecordState, AppState, ReduxAction } from '@skysmack/redux';
import { Person } from './../models/person';
import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class PersonsAppState extends AppState {
    public persons: PersonsState;
}

/**
 * This is only used in the reducer to show that this is substate given to the persons reducer.
 */
export class PersonsState implements PackageRecordState<Person, number> {
    [key: string]: PersonPackage;
}

export class PersonPackage implements RecordState<Person, number> {
    public localPageTypes: StrIndex<LocalPageTypes<number>> = {};
    public localRecords: StrIndex<LocalObject<Person>> = {};
}

export function personsReducer(state = new PersonsState(), action: ReduxAction, prefix: string = 'PERSONS_'): PersonsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PersonsState, Person, number>(state, action, prefix)
            };
    }
}
