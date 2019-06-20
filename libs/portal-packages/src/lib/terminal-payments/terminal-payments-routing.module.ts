import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { terminalsRoutes } from './terminals/components/terminals-components';
import { receiptsRoutes } from './receipts/components/receipts-component';
import { clientsRoutes } from './clients';
import { connectionsRoutes } from './connections/components/connections-component';
import { terminalPaymentsIndexRoutes } from './components/teminal-payments-index-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...terminalPaymentsIndexRoutes,
    ...terminalsRoutes,
    ...receiptsRoutes,
    ...clientsRoutes,
    ...connectionsRoutes
  ]
  )],
  exports: [RouterModule]
})
export class TerminalPaymentsRoutingModule { }
