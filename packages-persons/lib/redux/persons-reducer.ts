import { recordReducersBase, RecordState, PackageAction, IPackageAppState } from '@skysmack/redux';
import { Person } from './../models/person';
import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';

export class PersonsState implements RecordState<Person, number> {
    public localPageTypes: StrIndex<LocalPageTypes<number>> = {};
    public localRecords: StrIndex<LocalObject<Person>> = {};
}

export function personsReducer(state: IPackageAppState<PersonsState> = new PersonsState() as any, action: PackageAction, prefix: string = 'PERSONS_'): IPackageAppState<PersonsState> {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<Person, number>(state, action, prefix)
            };
    }
}