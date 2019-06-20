import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { terminalsRoutes } from './terminals/components/terminals-components';
import { receiptsRoutes } from './receipts/components/receipts-component';
import { clientsRoutes } from './clients';
import { connectionsRoutes } from './connections/components/connections-component';

@NgModule({
  imports: [RouterModule.forChild([
    ...terminalsRoutes,
    ...receiptsRoutes,
    ...clientsRoutes,
    ...connectionsRoutes
  ]
  )],
  exports: [RouterModule]
})
export class TerminalPaymentsRoutingModule { }
