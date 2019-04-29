import { NgModule } from '@angular/core';
import { accessPolicyPermissionsReducer, accessPolicyRolesReducer, accessPolicyRulesReducer } from '@skysmack/packages-skysmack-core';
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
    registerRedux('accessPolicyPermissions', accessPolicyPermissionsReducer, permissionsEpics);
    registerRedux('accessPolicyRoles', accessPolicyRolesReducer, rolesEpics);
    registerRedux('accessPolicyRules', accessPolicyRulesReducer, rulesEpics);
  }
}
