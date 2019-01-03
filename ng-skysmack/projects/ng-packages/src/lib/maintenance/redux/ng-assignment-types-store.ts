import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AssignmentType, AssignmentTypesAppState } from '@skysmack/packages-maintenance';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesStore extends NgDocumentRecordReduxStore<AssignmentTypesAppState, AssignmentType, number> {
    constructor(protected ngRedux: NgRedux<AssignmentTypesAppState>) { super(ngRedux, 'assignmentTypes'); }
}
