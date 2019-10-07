import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentsSchedulesAppState, AssignmentsSchedule, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS, ASSIGNMENTS_SCHEDULES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsSchedulesActions extends RecordActionsBase<AssignmentsSchedulesAppState, NgRedux<AssignmentsSchedulesAppState>> {
    constructor(protected store: NgRedux<AssignmentsSchedulesAppState>) { super(store, ASSIGNMENTS_SCHEDULES_REDUX_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<AssignmentsSchedule, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
