import { RecordRequests, RecordEpicsBase } from '@skysmack/redux';
import { Role } from '../models/role';

export class RolesEpics extends RecordEpicsBase<Role, number> {
    constructor(protected requests: RecordRequests<Role, number>) {
        super(requests, 'ROLES_');
    }
}