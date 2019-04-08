import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Assignment, AssignmentsAppState, ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsStore extends NgRecordStore<AssignmentsAppState, Assignment, number> {
    constructor(protected ngRedux: NgRedux<AssignmentsAppState>) { super(ngRedux, ASSIGNMENTS_AREA_KEY); }
}
