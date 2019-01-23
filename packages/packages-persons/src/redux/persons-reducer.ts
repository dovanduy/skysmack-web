import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Person } from './../models/person';
import { sharedReducer } from '@skysmack/redux';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class PersonsAppState extends AppState {
    public persons: PersonsState;
}

export class PersonsState implements DocumentRecordState<Person, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Person, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function personsReducer(state = new PersonsState(), action: ReduxAction, prefix: string = 'PERSONS_'): PersonsState {
    state = sharedReducer(state, action, new PersonsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<PersonsState, Person, number>(state, action, prefix)
            };
    }
}
