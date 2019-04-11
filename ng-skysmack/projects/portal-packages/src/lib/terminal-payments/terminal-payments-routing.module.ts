import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { terminalsRoutes } from './terminals/components/terminals-components';
import { receiptsRoutes } from './receipts/components/receipts-component';

@NgModule({
  imports: [RouterModule.forChild([
    ...terminalsRoutes,
    ...receiptsRoutes
  ]
  )],
  exports: [RouterModule]
})
export class TerminalPaymentsRoutingModule { }
