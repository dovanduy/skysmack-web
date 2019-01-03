import { RecordEpicsBase, RecordRequests } from '@skysmack/redux';
import { RecurringAssignment } from '../models/recurring-assignment';

export class RecurringAssignmentsEpics extends RecordEpicsBase<RecurringAssignment, number> {
    constructor(protected requests: RecordRequests<RecurringAssignment, number>) {
        super(requests, 'RECURRING_ASSIGNMENT_');
    }
}