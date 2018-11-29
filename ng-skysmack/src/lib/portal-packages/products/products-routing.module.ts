import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './components/products-components';

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
