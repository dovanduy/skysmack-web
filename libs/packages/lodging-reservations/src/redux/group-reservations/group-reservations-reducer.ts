import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { GROUP_RESERVATIONS_REDUCER_KEY, GROUP_RESERVATIONS_REDUX_KEY } from '../../constants/constants';
import { GroupReservation } from '../../models/group-reservation';

/**
 * This is to be used when you want to access groupReservations via the GLOBAL state. E.g. state.groupReservations (where groupReservations is the reducer name.)
 */
export class GroupReservationsAppState extends AppState {
    public groupReservations: GroupReservationsState;
}

export class GroupReservationsState implements RecordState<GroupReservation, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<GroupReservation, number>>> = {};
}

export function groupReservationsReducer(state = new GroupReservationsState(), action: ReduxAction, prefix: string = GROUP_RESERVATIONS_REDUX_KEY): GroupReservationsState {
    state = sharedReducer(state, action, new GroupReservationsState(), GROUP_RESERVATIONS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<GroupReservationsState, GroupReservation, number>(state, action, prefix)
            };
    }
}
