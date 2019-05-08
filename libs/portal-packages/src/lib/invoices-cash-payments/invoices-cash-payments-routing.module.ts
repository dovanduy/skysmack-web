import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { invoicesCashPaymentsRoutes } from './invoices-cash-payments/components/invoices-cash-payments-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...invoicesCashPaymentsRoutes,
  ])],
  exports: [RouterModule]
})
export class InvoicesCashPaymentsRoutingModule { }
