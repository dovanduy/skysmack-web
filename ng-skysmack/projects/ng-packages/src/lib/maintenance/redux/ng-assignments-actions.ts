import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentsAppState, Assignment } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsActions extends RecordActionsBase<AssignmentsAppState, NgRedux<AssignmentsAppState>> {
    constructor(protected store: NgRedux<AssignmentsAppState>) { super(store, 'ASSIGNMENTS_', ['assignments']); }

    protected getMessageParams(record: LocalObject<Assignment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
