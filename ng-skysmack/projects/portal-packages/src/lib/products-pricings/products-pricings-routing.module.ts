import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsSalesPriceRoutes } from './products-sales-price/components/products-sales-price-components';
import { productTypeSalesPriceRoutes } from './product-type-sales-price/components/product-type-sales-price-components';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';

@NgModule({
  imports: [RouterModule.forChild([
    ...[
      {
        path: '', component: ProductsPricingsIndexComponent,
      }
    ],
    ...productsSalesPriceRoutes,
    ...productTypeSalesPriceRoutes
  ]
  )],
  exports: [RouterModule]
})
export class ProductsPricingsRoutingModule { }
