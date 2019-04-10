import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AssignmentType, AssignmentTypesAppState, ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesStore extends NgRecordStore<AssignmentTypesAppState, AssignmentType, number> {
    constructor(protected ngRedux: NgRedux<AssignmentTypesAppState>) { super(ngRedux, ASSIGNMENT_TYPES_AREA_KEY); }
}
