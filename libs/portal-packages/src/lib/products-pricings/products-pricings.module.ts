import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgProductsPricingsModule } from '@skysmack/ng-products-pricings';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';

import { ProductsPricingsRoutingModule } from './products-pricings-routing.module';
import { productsSalesPriceComponents } from './products-sales-price/components/products-sales-price-components';
import { productTypeSalesPriceComponents } from './product-type-sales-price/components/product-type-sales-price-components';
import { ProductsPricingsIndexComponent } from './components/products-pricings-index/products-pricings-index.component';
import { productPriceChangesComponents } from './product-price-changes/components/product-price-changes-components';
import { productTypePriceChangesComponents } from './product-type-price-changes/components/product-type-price-changes-components';
import { NgProductPricingsFieldProvider } from './ng-product-pricings-field-provider';
import { ProductsTypeId } from '@skysmack/package-types';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { NgProductsPricingsMenuProvider } from './ng-products-pricings-menu-provider';
import { NgProductPriceChangesMenuProvider } from './product-price-changes/ng-product-price-changes-menu-provider';
import { NgProductTypePriceChangesMenuProvider } from './product-type-price-changes/ng-product-type-price-changes-menu-provider';
import { NgProductTypeSalesPriceMenuProvider } from './product-type-sales-price/ng-product-type-sales-price-menu-provider';
import { NgProductsSalesPriceMenuProvider } from './products-sales-price/ng-products-sales-price-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsPricingsRoutingModule,
    NgProductsPricingsModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ProductsPricingsIndexComponent,
    ...productsSalesPriceComponents,
    ...productTypeSalesPriceComponents,
    ...productPriceChangesComponents,
    ...productTypePriceChangesComponents
  ],
  providers: []
})
export class ProductsPricingsModule {
  constructor(
    fieldProviders: FieldProviders,
    productPricingsFieldProvider: NgProductPricingsFieldProvider,
    ngMenuProviders: NgMenuProviders,
    ngProductsPricingsMenuProvider: NgProductsPricingsMenuProvider,
    ngProductPriceChangesMenuProvider: NgProductPriceChangesMenuProvider,
    ngProductTypePriceChangesMenuProvider: NgProductTypePriceChangesMenuProvider,
    ngProductTypeSalesPriceMenuProvider: NgProductTypeSalesPriceMenuProvider,
    ngProductsSalesPriceMenuProvider: NgProductsSalesPriceMenuProvider
  ) {
    fieldProviders.add(ProductsTypeId, productPricingsFieldProvider);
    ngMenuProviders
      .add(ngProductsPricingsMenuProvider)
      .add(ngProductPriceChangesMenuProvider)
      .add(ngProductTypePriceChangesMenuProvider)
      .add(ngProductTypeSalesPriceMenuProvider)
      .add(ngProductsSalesPriceMenuProvider)
  }
}
