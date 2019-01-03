import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';
import { MaintenanceState } from '../models/maintenance-state';

export class MaintenanceStateEpics extends DocumentRecordEpicsBase<MaintenanceState, number> {
    constructor(protected requests: DocumentRecordRequests<MaintenanceState, number>) {
        super(requests, 'MAINTENANCE_STATE_');
    }
}