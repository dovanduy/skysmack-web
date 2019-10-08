import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentsState, AssignmentsActions } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsActions extends AssignmentsActions {
    constructor(protected store: NgRedux<AssignmentsState>) { super(store); }
}
