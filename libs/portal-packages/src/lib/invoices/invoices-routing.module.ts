import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { invoicesRoutes } from './invoice/components/invoices-components';
import { invoiceItemsRoutes } from './invoice-item/components/invoice-items-components';
import { invoicePaymentsRoutes } from './invoice-payment/components/invoice-payments-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...invoicesRoutes,
        ...invoiceItemsRoutes,
        ...invoicePaymentsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
