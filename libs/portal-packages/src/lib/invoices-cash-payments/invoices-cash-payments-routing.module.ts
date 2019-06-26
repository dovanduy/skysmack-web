import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { invoicesCashPaymentsRoutes } from './invoices-cash-payments/components/invoices-cash-payments-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...invoicesCashPaymentsRoutes,
      ]
    }
  ])],
  exports: [RouterModule]
})
export class InvoicesCashPaymentsRoutingModule { }
