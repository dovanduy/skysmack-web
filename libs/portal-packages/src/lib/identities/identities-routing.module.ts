import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { identitiesRoutes } from './components/identities-components';
import { rolesRoutes } from './identity-roles/components';
import { usersRoutes } from './identity-users/components';

@NgModule({
  imports: [RouterModule.forChild([
    ...identitiesRoutes,
    ...rolesRoutes,
    ...usersRoutes
  ])],
  exports: [RouterModule]
})
export class IdentitiesRoutingModule { }
