import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AssignmentType, AssignmentTypesAppState, ASSIGNMENT_TYPES_REDUCER_KEY } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesStore extends NgRecordStore<AssignmentTypesAppState, AssignmentType, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'state',
            relationIdSelector: 'stateId',
            stateSelector: 'maintenanceStates'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<AssignmentTypesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ASSIGNMENT_TYPES_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<AssignmentType, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<AssignmentType, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
