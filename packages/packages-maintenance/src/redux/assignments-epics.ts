import { Assignment } from '../models/index';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class AssignmentsEpics extends DocumentRecordEpicsBase<Assignment, number> {
    constructor(protected requests: DocumentRecordRequests<Assignment, number>) {
        super(requests, 'ASSIGNMENTS_');
    }
}