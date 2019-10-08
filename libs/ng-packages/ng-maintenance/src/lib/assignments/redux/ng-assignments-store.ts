import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AssignmentsAppState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsStore {
    constructor(
        protected ngRedux: NgRedux<AssignmentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }
}
