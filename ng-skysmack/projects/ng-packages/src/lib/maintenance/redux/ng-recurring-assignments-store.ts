import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsStore extends NgRecordStore<RecurringAssignmentsAppState, RecurringAssignment, number> {
    constructor(protected ngRedux: NgRedux<RecurringAssignmentsAppState>) { super(ngRedux, 'assignments'); }
}
