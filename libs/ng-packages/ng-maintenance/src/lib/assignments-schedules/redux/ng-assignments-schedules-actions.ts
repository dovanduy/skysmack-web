import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentsSchedulesActions, AssignmentsSchedulesAppState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsSchedulesActions extends AssignmentsSchedulesActions {
    constructor(protected store: NgRedux<AssignmentsSchedulesAppState>) { super(store); }
}
