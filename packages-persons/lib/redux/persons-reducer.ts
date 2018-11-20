import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Person } from './../models/person';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class PersonsAppState extends AppState {
    public persons: PersonsState;
}

export class PersonsState implements DocumentRecordState<Person, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Person>>> = {};
    public fields: StrIndex<LocalObject<FieldSchemaViewModel>[]> = {};
    public availableFields: StrIndex<FieldValueProviderViewModel[]> = {};
}

export function personsReducer(state = new PersonsState(), action: ReduxAction, prefix: string = 'PERSONS_'): PersonsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<PersonsState, Person, number>(state, action, prefix)
            };
    }
}
