import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Role } from '@skysmack/packages-identities';
import { NgRolesRequests } from './ng-roles-requests';
import { Injectable } from '@angular/core';
import { NgRolesNotifications } from '../ng-roles-notifications';

@Injectable({ providedIn: 'root' })
export class NgRolesEpics extends RecordEpicsBase<Role, number> {
    constructor(protected requests: NgRolesRequests, protected notifications: NgRolesNotifications) {
        super(requests, 'ROLES_', notifications);
    }
}
