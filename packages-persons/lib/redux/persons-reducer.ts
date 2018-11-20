import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, PackageDocumentRecordState, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Person } from './../models/person';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class PersonsAppState extends AppState {
    public persons: PersonsState;
}

/**
 * This is only used in the reducer to show that this is substate given to the persons reducer.
 */
export class PersonsState implements PackageDocumentRecordState<Person, number> {
    [key: string]: PersonPackage;
}

export class PersonPackage implements DocumentRecordState<Person, number> {
    public localPageTypes: StrIndex<LocalPageTypes<number>> = {};
    public localRecords: StrIndex<LocalObject<Person>> = {};
    public fields: FieldSchemaViewModel[] = [];
    public availableFields: FieldValueProviderViewModel[] = [];
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
