import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Role } from '@skysmack/packages-identities';
import { NgRolesRequests } from './ng-roles-requests';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgRolesEpics extends RecordEpicsBase<Role, number> {
    constructor(protected requests: NgRolesRequests) {
        super(requests, 'ROLES_');
    }
}
