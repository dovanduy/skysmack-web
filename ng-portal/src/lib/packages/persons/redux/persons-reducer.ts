import { recordReducersBase, RecordState, PackageAction } from '@skysmack/redux';
import { Person } from '@skysmack/packages-persons';

export function personsReducer(state: RecordState<Person, number>, action: PackageAction, prefix: string = ''): RecordState<Person, number> {
    switch (action.type) {
        default:
            return recordReducersBase<Person, number>(state, action, prefix);
    }
}
