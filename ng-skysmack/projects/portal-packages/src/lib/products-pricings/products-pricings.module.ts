import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgProductsPricingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { ProductsPricingsRoutingModule } from './products-pricings-routing.module';
import { productsSalesPriceComponents } from './products-sales-price/components/products-sales-price-components';
import { productTypeSalesPriceComponents } from './product-type-sales-price/components/product-type-sales-price-components';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';
import { productPriceChangesComponents } from './product-price-changes/components/product-price-changes-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsPricingsRoutingModule,
    NgProductsPricingsModule,
    PortalUiModule,
    FieldsModule
  ],
  exports: [],
  declarations: [
    ProductsPricingsIndexComponent,
    ...productsSalesPriceComponents,
    ...productTypeSalesPriceComponents,
    ...productPriceChangesComponents
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
export class ProductsPricingsModule {
  constructor(public languageService: LanguageService) { }
}
