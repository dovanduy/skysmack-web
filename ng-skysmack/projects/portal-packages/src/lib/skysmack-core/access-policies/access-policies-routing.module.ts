import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { accessPolicyPermissionsRoutes } from './components/access-policy-permissions-components';
import { accessPolicyRolesRoutes } from './components/access-policy-roles-components';
import { accessPolicyRulesRoutes } from './components/access-policy-rules-components';
import { accessPoliciesRoutes } from './components/access-policies-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...accessPolicyPermissionsRoutes,
    ...accessPolicyRolesRoutes,
    ...accessPolicyRulesRoutes,
    ...accessPoliciesRoutes
  ])],
  exports: [RouterModule]
})
export class AccessPoliciesRoutingModule { }
