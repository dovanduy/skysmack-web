import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Role, ROLES_REDUX_KEY } from '@skysmack/packages-identities';
import { NgRolesRequests } from './ng-roles-requests';
import { Injectable } from '@angular/core';
import { NgRolesNotifications } from '../ng-roles-notifications';

@Injectable({ providedIn: 'root' })
export class NgRolesEpics extends RecordEpicsBase<Role, number> {
    constructor(protected requests: NgRolesRequests, protected notifications: NgRolesNotifications) {
        super(requests, ROLES_REDUX_KEY, notifications);
    }
}
