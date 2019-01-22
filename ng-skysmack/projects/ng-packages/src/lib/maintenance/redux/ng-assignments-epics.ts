import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Assignment } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentsRequests } from './ng-assignments-requests';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics extends RecordEpicsBase<Assignment, number> {
    constructor(protected requests: NgAssignmentsRequests) {
        super(requests, 'ASSIGNMENTS_');
    }
}
