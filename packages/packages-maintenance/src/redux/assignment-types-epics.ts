import { AssignmentType } from '../models/assignment-type';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class AssignmentTypesEpics extends DocumentRecordEpicsBase<AssignmentType, number> {
    constructor(protected requests: DocumentRecordRequests<AssignmentType, number>) {
        super(requests, 'ASSIGNMENT_TYPES_');
    }
}