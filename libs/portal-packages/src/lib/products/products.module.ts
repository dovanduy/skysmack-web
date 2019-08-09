import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgProductsModule } from '@skysmack/ng-products';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { productsComponents } from './products/components/products-components';
import { productTypesComponents } from './product-types/components/product-types-component';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgProductsMenuProvider } from './products/ng-products-menu-provider';
import { NgProductTypesMenuProvider } from './product-types/ng-product-types-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgProductsModule,
    DynamicFormsModule,
    ProductsRoutingModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...productsComponents,
    ...productTypesComponents,
  ],
  providers: []
})
export class ProductsModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngProductsMenuProvider: NgProductsMenuProvider,
    ngProductTypesMenuProvider: NgProductTypesMenuProvider
  ) {
    ngMenuProviders
      .add(ngProductsMenuProvider)
      .add(ngProductTypesMenuProvider)
  }
}
