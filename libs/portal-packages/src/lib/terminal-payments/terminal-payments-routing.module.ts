import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { terminalsRoutes } from './terminals/components/terminals-components';
import { receiptsRoutes } from './receipts/components/receipts-component';
import { connectionsRoutes } from './connections/components/connections-component';
import { terminalPaymentsIndexRoutes } from './components/teminal-payments-index-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { terminalPaymentReceiptsRoutes } from './terminal-payment-receipts/components/terminal-payment-receipts-components';
import { terminalReceiptsRoutes } from './terminal-receipts';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...terminalPaymentsIndexRoutes,
        ...terminalsRoutes,
        ...receiptsRoutes,
        ...connectionsRoutes,
        ...terminalPaymentReceiptsRoutes,
        ...terminalReceiptsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class TerminalPaymentsRoutingModule { }
