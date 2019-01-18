import { NgAssignmentTypesRequests } from './ng-assignment-types-requests';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { AssignmentType } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesEpics extends DocumentRecordEpicsBase<AssignmentType, number> {
    constructor(protected requests: NgAssignmentTypesRequests) {
        super(requests, 'ASSIGNMENT_TYPES_');
    }
}