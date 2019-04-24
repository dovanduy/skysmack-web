import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { accountsRoutes } from './accounts/components/accounts-components';

@NgModule({
  imports: [RouterModule.forChild(accountsRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
