import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { identitiesRoutes } from './components/identities-components';
import { rolesRoutes } from './identity-roles/components';
import { usersRoutes } from './identity-users/components';
import { accountsRoutes } from './accounts';

@NgModule({
  imports: [RouterModule.forChild([
    ...identitiesRoutes,
    ...rolesRoutes,
    ...usersRoutes,
    ...accountsRoutes
  ])],
  exports: [RouterModule]
})
export class IdentitiesRoutingModule { }
