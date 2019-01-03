import { DocumentRecordRequests, RecordEpicsBase, RecordRequests } from '@skysmack/redux';
import { MaintenanceState } from '../models/maintenance-state';

export class MaintenanceStateEpics extends RecordEpicsBase<MaintenanceState, number> {
    constructor(protected requests: RecordRequests<MaintenanceState, number>) {
        super(requests, 'MAINTENANCE_STATE_');
    }
}