import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { identitiesRoutes } from './components/identities-components';
import { rolesRoutes, usersRoutes } from './components';

@NgModule({
  imports: [RouterModule.forChild([
    ...identitiesRoutes,
    ...rolesRoutes,
    ...usersRoutes
  ])],
  exports: [RouterModule]
})
export class IdentitiesRoutingModule { }
