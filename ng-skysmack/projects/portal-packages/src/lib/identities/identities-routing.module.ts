import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { identitiesRoutes } from './components/identities-components';
import { rolesRoutes } from './components';

@NgModule({
  imports: [RouterModule.forChild([
    ...identitiesRoutes,
    ...rolesRoutes
  ])],
  exports: [RouterModule]
})
export class IdentitiesRoutingModule { }
