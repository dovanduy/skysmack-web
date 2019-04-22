import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './products/components/products-components';
import { productTypesRoutes } from './product-types/components/product-types-component';

@NgModule({
  imports: [RouterModule.forChild([
    ...productsRoutes,
    ...productTypesRoutes
  ]
  )],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
