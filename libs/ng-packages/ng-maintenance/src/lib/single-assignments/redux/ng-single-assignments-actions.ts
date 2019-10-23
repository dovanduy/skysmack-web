import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SingleAssignmentsAppState, SingleAssignment, SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSingleAssignmentsActions extends RecordActionsBase<SingleAssignmentsAppState, NgRedux<SingleAssignmentsAppState>> {
    constructor(protected store: NgRedux<SingleAssignmentsAppState>) { super(store, SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<SingleAssignment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
