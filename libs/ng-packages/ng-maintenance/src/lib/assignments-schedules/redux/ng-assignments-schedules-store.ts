import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentsSchedule, AssignmentsSchedulesAppState, ASSIGNMENTS_SCHEDULES_REDUCER_KEY, } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsSchedulesStore extends NgRecordStore<AssignmentsSchedulesAppState, AssignmentsSchedule, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'assignmentType',
            relationIdSelector: 'assignmentTypeId',
            stateSelector: 'assignmentTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<AssignmentsSchedulesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ASSIGNMENTS_SCHEDULES_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<AssignmentsSchedule, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<AssignmentsSchedule, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
