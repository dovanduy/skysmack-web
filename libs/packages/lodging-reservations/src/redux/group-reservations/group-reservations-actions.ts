import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { GROUP_RESERVATIONS_REDUX_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS } from '../../constants';
import { GroupReservationsAppState } from './group-reservations-reducer';
import { GroupReservation } from '../../models/group-reservation';

export class GroupReservationsActions extends RecordActionsBase<GroupReservationsAppState, Store<GroupReservationsAppState>> {
    constructor(protected store: Store<GroupReservationsAppState>) { super(store, GROUP_RESERVATIONS_REDUX_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<GroupReservation, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}