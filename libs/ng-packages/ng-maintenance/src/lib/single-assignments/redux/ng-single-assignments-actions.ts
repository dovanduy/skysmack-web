import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SingleAssignmentsAppState, SingleAssignmentsActions } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgSingleAssignmentsActions extends SingleAssignmentsActions {
    constructor(protected store: NgRedux<SingleAssignmentsAppState>) { super(store); }
}
