import { NgModule } from '@angular/core';
import { accessPolicyPermissionsReducer, accessPolicyRolesReducer, accessPolicyRulesReducer, ACCESS_POLICY_PERMISSIONS_REDUCER_KEY, ACCESS_POLICY_ROLES_REDUCER_KEY, ACCESS_POLICY_RULES_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { registerRedux } from '@skysmack/ng-redux';
import { NgAccessPolicyPermissionsEpics } from './access-policy-permissions/redux/ng-access-policy-permissions-epics';
import { NgAccessPolicyRolesEpics } from './access-policy-roles/redux/ng-access-policy-roles-epics';
import { NgAccessPolicyRulesEpics } from './access-policy-rules/redux/ng-access-policy-rules-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgAccessPoliciesModule {
  constructor(
    permissionsEpics: NgAccessPolicyPermissionsEpics,
    rolesEpics: NgAccessPolicyRolesEpics,
    rulesEpics: NgAccessPolicyRulesEpics
  ) {
    registerRedux(ACCESS_POLICY_PERMISSIONS_REDUCER_KEY, accessPolicyPermissionsReducer, permissionsEpics);
    registerRedux(ACCESS_POLICY_ROLES_REDUCER_KEY, accessPolicyRolesReducer, rolesEpics);
    registerRedux(ACCESS_POLICY_RULES_REDUCER_KEY, accessPolicyRulesReducer, rulesEpics);
  }
}
