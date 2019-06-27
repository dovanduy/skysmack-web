import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsSalesPriceRoutes } from './products-sales-price/components/products-sales-price-components';
import { productTypeSalesPriceRoutes } from './product-type-sales-price/components/product-type-sales-price-components';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';
import { productPriceChangesRoutes } from './product-price-changes';
import { productTypePriceChangesRoutes } from './product-type-price-changes/components/product-type-price-changes-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...[{ path: '', component: ProductsPricingsIndexComponent }],
        ...productsSalesPriceRoutes,
        ...productTypeSalesPriceRoutes,
        ...productPriceChangesRoutes,
        ...productTypePriceChangesRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class ProductsPricingsRoutingModule { }
