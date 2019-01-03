import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';
import { RecurringAssignment } from '../models/recurring-assignment';

export class RecurringAssignmentsEpics extends DocumentRecordEpicsBase<RecurringAssignment, number> {
    constructor(protected requests: DocumentRecordRequests<RecurringAssignment, number>) {
        super(requests, 'RECURRING_ASSIGNMENT_');
    }
}