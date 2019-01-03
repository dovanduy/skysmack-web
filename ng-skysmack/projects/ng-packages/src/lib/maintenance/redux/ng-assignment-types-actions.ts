import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentTypesAppState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesActions extends DocumentRecordActionsBase<AssignmentTypesAppState, NgRedux<AssignmentTypesAppState>> {
    constructor(protected store: NgRedux<AssignmentTypesAppState>) { super(store, 'ASSIGNMENT_TYPES_', ['types']); }
}
