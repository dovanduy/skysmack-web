import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { invoicesProductsRoutes } from './invoices-products/components/invoices-products-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...invoicesProductsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class InvoicesProductsRoutingModule { }
