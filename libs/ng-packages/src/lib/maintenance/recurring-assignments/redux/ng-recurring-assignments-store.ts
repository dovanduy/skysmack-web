import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignment, RecurringAssignmentsAppState, } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsStore extends NgRecordStore<RecurringAssignmentsAppState, RecurringAssignment, number> {
    constructor(
        protected ngRedux: NgRedux<RecurringAssignmentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'recurringAssignments'); }
}
