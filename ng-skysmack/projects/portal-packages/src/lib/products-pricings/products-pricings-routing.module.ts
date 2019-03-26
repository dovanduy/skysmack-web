import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    ...productsSalesPriceRoutes
  ]
  )],
  exports: [RouterModule]
})
export class ProductsPricingsRoutingModule { }
