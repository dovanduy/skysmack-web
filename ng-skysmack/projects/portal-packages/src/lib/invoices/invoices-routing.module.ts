import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { invoicesRoutes } from './invoice/components/invoices-components';

@NgModule({
  imports: [RouterModule.forChild(invoicesRoutes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
