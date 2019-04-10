import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgProductsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { productsComponents } from './products/components/products-components';
import { productTypesComponents } from './product-types/components/product-types-component';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgProductsModule,
    PortalUiModule,
    FieldsModule
  ],
  exports: [],
  declarations: [
    ...productsComponents,
    ...productTypesComponents
  ],
  providers: [
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class ProductsModule {
  constructor(public languageService: LanguageService) { }
}
