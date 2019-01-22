import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentsAppState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsActions extends RecordActionsBase<AssignmentsAppState, NgRedux<AssignmentsAppState>> {
    constructor(protected store: NgRedux<AssignmentsAppState>) { super(store, 'ASSIGNMENTS_', ['assignments']); }
}
