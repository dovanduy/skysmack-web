import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { identitiesRoutes } from './components/identities-components';

@NgModule({
  imports: [RouterModule.forChild(identitiesRoutes)],
  exports: [RouterModule]
})
export class IdentitiesRoutingModule { }
