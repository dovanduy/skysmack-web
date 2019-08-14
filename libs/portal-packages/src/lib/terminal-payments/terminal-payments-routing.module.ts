import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { terminalsRoutes } from './terminals/components/terminals-components';
import { receiptsRoutes } from './receipts/components/receipts-component';
import { connectionsRoutes } from './connections/components/connections-component';
import { terminalPaymentsIndexRoutes } from './components/teminal-payments-index-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...terminalPaymentsIndexRoutes,
        ...terminalsRoutes,
        ...receiptsRoutes,
        ...connectionsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class TerminalPaymentsRoutingModule { }
