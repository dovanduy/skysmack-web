import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AssignmentsAppState, AssignmentsState, Assignment } from '@skysmack/packages-maintenance';
import { Observable } from 'rxjs';
import { LocalObject, safeUndefinedTo, dictionaryToArray } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsStore {
    constructor(
        protected ngRedux: NgRedux<AssignmentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }

    public get(packagePath: string): Observable<LocalObject<Assignment, unknown>[]> {
        return this.getState().pipe(
            map(state => state.localRecords[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<Assignment, unknown>>()
        );
    }

    protected getState(): Observable<AssignmentsState> {
        return this.ngRedux.select(state => state.assignments);
    }
}
