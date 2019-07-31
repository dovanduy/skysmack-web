import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { NgAccessPolicyRolesRequests } from './ng-access-policy-roles-requests';
import { AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_REDUX_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesNotifications } from '../ng-access-policy-roles-notifications';
import { NgAccessPolicyRulesStore, NgAccessPolicyRulesActions } from '../../access-policy-rules';
import { NgAccessPolicyRolesStore } from './ng-access-policy-roles-store';
import { NgAccessPolicyRolesActions } from './ng-access-policy-roles-actions';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesEpics extends RecordEpicsBase<AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(
        protected requests: NgAccessPolicyRolesRequests, 
        protected skysmackStore: NgSkysmackStore,
        protected accessPolicyRulesStore: NgAccessPolicyRulesStore,
        protected accessPolicyRulesActions: NgAccessPolicyRulesActions,
        protected accessPolicyRolesStore: NgAccessPolicyRolesStore,
        protected accessPolicyRolesActions: NgAccessPolicyRolesActions,
        protected notifications: NgAccessPolicyRolesNotifications
    ) {
        super(requests, ACCESS_POLICY_ROLES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: ACCESS_POLICY_ROLES_REDUX_KEY,
                relationIdSelector: 'ruleId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.accessPolicyRulesStore,
                actions: this.accessPolicyRulesActions
            }),
            ...getReadDependencies({
                prefix: ACCESS_POLICY_ROLES_REDUX_KEY,
                relationIdSelector: 'roleId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.accessPolicyRolesStore,
                actions: this.accessPolicyRolesActions
            }),
        ]);
    }
}
