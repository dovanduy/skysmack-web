import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './products/components/products-components';
import { productTypesRoutes } from './product-types/components/product-types-component';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...productsRoutes,
        ...productTypesRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
