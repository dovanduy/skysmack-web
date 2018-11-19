import { recordReducersBase, RecordState, PackageAction, PackageRecordState, AppState } from '@skysmack/redux';
import { Person } from './../models/person';
import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { OfflineState } from '@redux-offline/redux-offline/lib/types';

export class PersonsAppState implements AppState {
    persons: PersonsState;
    offline?: OfflineState
}

export class PersonsState implements PackageRecordState<Person, number> {
    [key: string]: PersonPackage;
}

export class PersonPackage implements RecordState<Person, number> {
    public localPageTypes: StrIndex<LocalPageTypes<number>> = {};
    public localRecords: StrIndex<LocalObject<Person>> = {};
}

export function personsReducer(state = new PersonsState(), action: PackageAction, prefix: string = 'PERSONS_'): PersonsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PersonsState, Person, number>(state, action, prefix)
            };
    }
}
