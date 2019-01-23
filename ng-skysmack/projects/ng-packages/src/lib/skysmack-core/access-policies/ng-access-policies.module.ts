import { NgModule } from '@angular/core';
import { NgAccessPolicyPermissionsEpics } from './redux/access-policy-permissions/ng-access-policy-permissions-epics';
import { NgAccessPolicyRolesEpics } from './redux/access-policy-roles/ng-access-policy-roles-epics';
import { NgAccessPolicyRulesEpics } from './redux/access-policy-rules/ng-access-policy-rules-epics';
import { ReducerRegistry } from '@skysmack/redux';
import { accessPolicyPermissionsReducer, accessPolicyRolesReducer, accessPolicyRulesReducer } from '@skysmack/packages-skysmack-core';
import { registerEpics } from '@skysmack/ng-redux';

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
    ReducerRegistry.Instance.register('accessPolicyPermissions', accessPolicyPermissionsReducer);
    ReducerRegistry.Instance.register('accessPolicyRoles', accessPolicyRolesReducer);
    ReducerRegistry.Instance.register('accessPolicyRules', accessPolicyRulesReducer);
    registerEpics(permissionsEpics);
    registerEpics(rolesEpics);
    registerEpics(rulesEpics);
  }
}
