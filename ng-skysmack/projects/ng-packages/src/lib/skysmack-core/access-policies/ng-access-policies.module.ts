import { NgModule } from '@angular/core';
import { NgAccessPolicyPermissionsEpics } from './redux/access-policy-permissions/ng-access-policy-permissions-epics';
import { NgAccessPolicyRolesEpics } from './redux/access-policy-roles/ng-access-policy-roles-epics';
import { NgAccessPolicyRulesEpics } from './redux/access-policy-rules/ng-access-policy-rules-epics';
import { accessPolicyPermissionsReducer, accessPolicyRolesReducer, accessPolicyRulesReducer, ACCESS_POLICY_PERMISSIONS_AREA_KEY, ACCESS_POLICY_ROLES_AREA_KEY, ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { registerRedux } from '@skysmack/ng-redux';

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
    registerRedux(ACCESS_POLICY_PERMISSIONS_AREA_KEY, accessPolicyPermissionsReducer, permissionsEpics);
    registerRedux(ACCESS_POLICY_ROLES_AREA_KEY, accessPolicyRolesReducer, rolesEpics);
    registerRedux(ACCESS_POLICY_RULES_AREA_KEY, accessPolicyRulesReducer, rulesEpics);
  }
}
