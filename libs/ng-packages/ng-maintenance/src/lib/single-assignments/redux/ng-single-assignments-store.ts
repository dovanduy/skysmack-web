import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { SingleAssignment, SingleAssignmentsAppState, SINGLE_ASSIGNMENTS_REDUCER_KEY } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgSingleAssignmentsStore extends NgRecordStore<SingleAssignmentsAppState, SingleAssignment, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'assignmentType',
            relationIdSelector: 'assignmentTypeId',
            stateSelector: 'assignmentTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<SingleAssignmentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, SINGLE_ASSIGNMENTS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<SingleAssignment, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<SingleAssignment, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
