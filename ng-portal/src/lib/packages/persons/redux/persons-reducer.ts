import { recordReducersBase, RecordState, PackageAction, ReducerRegistry } from '@skysmack/redux';
import { Person } from '@skysmack/packages-persons';

export interface PersonsState extends RecordState<Person, number> { }
export const PERSONS_INITIAL_STATE: PersonsState = {
    localPageTypes: {},
    localRecords: {}
};

export function personsReducer(state: PersonsState = PERSONS_INITIAL_STATE, action: PackageAction, prefix: string = ''): RecordState<Person, number> {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<Person, number>(state, action, prefix)
            };
    }
}

// EXPERIMENTAL
const reducerRegistry = ReducerRegistry.Instance;
reducerRegistry.register('persons', personsReducer);