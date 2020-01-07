import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { invoicesPersonsRoutes } from './invoices-persons/components/invoices-persons-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...invoicesPersonsRoutes,
      ]
    }
  ])],
  exports: [RouterModule]
})
export class InvoicesPersonsRoutingModule { }
