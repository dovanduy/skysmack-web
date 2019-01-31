import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { invoicesRoutes } from './invoice/components/invoices-components';
import { invoiceItemsRoutes } from './invoice-item/components/invoice-items-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...invoicesRoutes,
    ...invoiceItemsRoutes
  ])],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
