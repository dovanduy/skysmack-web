import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignment, RecurringAssignmentsAppState, } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsStore extends NgRecordStore<RecurringAssignmentsAppState, RecurringAssignment, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'assignmentType',
            relationIdSelector: 'assignmentTypeId',
            stateSelector: 'assignmentTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<RecurringAssignmentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'recurringAssignments'); }

    public get(packagePath: string): Observable<LocalObject<RecurringAssignment, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<RecurringAssignment, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
