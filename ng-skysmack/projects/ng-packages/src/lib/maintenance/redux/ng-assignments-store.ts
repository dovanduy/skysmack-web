import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Assignment, AssignmentsAppState } from '@skysmack/packages-maintenance';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsStore extends NgRecordReduxStore<AssignmentsAppState, Assignment, number> {
    constructor(protected ngRedux: NgRedux<AssignmentsAppState>) { super(ngRedux, 'assignments'); }
}
