import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { accessPolicyPermissionsRoutes } from './access-policy-permissions/components/access-policy-permissions-components';
import { accessPolicyRolesRoutes } from './access-policy-roles/components/access-policy-roles-components';
import { accessPolicyRulesRoutes } from './access-policy-rules/components/access-policy-rules-components';
import { accessPoliciesRoutes } from './components/access-policies-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...accessPolicyPermissionsRoutes,
        ...accessPolicyRolesRoutes,
        ...accessPolicyRulesRoutes,
        ...accessPoliciesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AccessPoliciesRoutingModule { }
