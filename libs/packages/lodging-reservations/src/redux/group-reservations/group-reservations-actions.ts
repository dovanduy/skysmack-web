import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LODGING_RESERVATIONS_REDUX_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '../../constants';
import { GroupReservationsAppState } from './group-reservations-reducer';
import { GroupReservation } from '../../models/group-reservation';

export class GroupReservationsActions extends RecordActionsBase<GroupReservationsAppState, Store<GroupReservationsAppState>> {
    constructor(protected store: Store<GroupReservationsAppState>) { super(store, LODGING_RESERVATIONS_REDUX_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<GroupReservation, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}