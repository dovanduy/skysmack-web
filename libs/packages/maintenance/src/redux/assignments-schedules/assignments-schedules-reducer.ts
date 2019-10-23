import { StrIndex, LocalObject, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, sharedReducer } from '@skysmack/redux';
import { ASSIGNMENTS_SCHEDULES_REDUCER_KEY, ASSIGNMENTS_SCHEDULES_REDUX_KEY } from '../../constants';
import { AssignmentsSchedule } from '../../models/assignments-schedule';

/**
 * This is to be used when you want to access maintenances via the GLOBAL state. E.g. state.maintenances (where maintenances is the reducer name.)
 */
export class AssignmentsSchedulesAppState extends AppState {
    public assignmentsSchedules: AssignmentsScheduleState;
}

export class AssignmentsScheduleState implements RecordState<AssignmentsSchedule, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AssignmentsSchedule, number>>> = {};
}

export function assignmentsSchedulesReducer(state = new AssignmentsScheduleState(), action: ReduxAction, prefix: string = ASSIGNMENTS_SCHEDULES_REDUX_KEY): AssignmentsScheduleState {
    state = sharedReducer(state, action, new AssignmentsScheduleState(), ASSIGNMENTS_SCHEDULES_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AssignmentsScheduleState, AssignmentsSchedule, number>(state, action, prefix)
            };
    }
}
