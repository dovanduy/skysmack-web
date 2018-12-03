import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgProductsModule } from './../../ng-packages/products';
import { PortalUiModule } from 'lib/portal-ui/portal-ui.module';
import { productsComponents } from './components/products-components';
import { productTypesComponents } from './components/product-types-component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgProductsModule,
    PortalUiModule
  ],
  exports: [],
  declarations: [
    ...productsComponents,
    ...productTypesComponents
  ],
  providers: [],
})
export class ProductsModule { }
