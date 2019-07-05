import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgProductsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { productsComponents } from './products/components/products-components';
import { productTypesComponents } from './product-types/components/product-types-component';
import { LanguageService } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgProductsModule,
    PortalUiModule,
    DynamicFormsModule,
    FieldsModule
  ],
  exports: [],
  declarations: [
    ...productsComponents,
    ...productTypesComponents,
  ],
  providers: [
    LanguageService
  ]
})
export class ProductsModule {
  constructor() { }
}
