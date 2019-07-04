import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgProductsPricingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule, FieldProviders } from '@skysmack/portal-ui';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { ProductsPricingsRoutingModule } from './products-pricings-routing.module';
import { productsSalesPriceComponents } from './products-sales-price/components/products-sales-price-components';
import { productTypeSalesPriceComponents } from './product-type-sales-price/components/product-type-sales-price-components';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';
import { productPriceChangesComponents } from './product-price-changes/components/product-price-changes-components';
import { productTypePriceChangesComponents } from './product-type-price-changes/components/product-type-price-changes-components';
import { NgProductPricingsFieldProvider } from './ng-product-pricings-field-provider';
import { ProductsType } from '@skysmack/packages-products';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsPricingsRoutingModule,
    NgProductsPricingsModule,
    PortalUiModule,
    NgDynamicFormsModule,
    FieldsModule
  ],
  exports: [],
  declarations: [
    ProductsPricingsIndexComponent,
    ...productsSalesPriceComponents,
    ...productTypeSalesPriceComponents,
    ...productPriceChangesComponents,
    ...productTypePriceChangesComponents
  ],
  providers: [
    LanguageService
  ]
})
export class ProductsPricingsModule {
  constructor(
    fieldProviders: FieldProviders,
    productPricingsFieldProvider: NgProductPricingsFieldProvider,
  ) {
    fieldProviders.add(ProductsType.id, productPricingsFieldProvider);
  }
}
