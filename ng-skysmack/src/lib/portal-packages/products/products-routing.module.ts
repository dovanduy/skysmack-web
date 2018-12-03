import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './components/products-components';
import { productTypesRoutes } from './components/product-types-component';

@NgModule({
  imports: [RouterModule.forChild([
    ...productsRoutes,
    ...productTypesRoutes
  ]
  )],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
