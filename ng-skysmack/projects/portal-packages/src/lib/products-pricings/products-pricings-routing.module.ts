import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsSalesPriceRoutes } from './products-sales-price/components/products-sales-price-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...productsSalesPriceRoutes
  ]
  )],
  exports: [RouterModule]
})
export class ProductsPricingsRoutingModule { }
