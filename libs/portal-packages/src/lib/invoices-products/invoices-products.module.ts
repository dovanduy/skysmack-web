import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, EntityActionProviders } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { InvoicesProductsRoutingModule } from './invoices-products-routing.module';
import { NgInvoicesProductsModule } from '@skysmack/ng-packages';
import { NgInvoicesProductsEntityActionProvider } from './ng-invoices-products-entity-action-provider';
import { ProductsType } from '@skysmack/packages-products';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    InvoicesProductsRoutingModule,
    NgInvoicesProductsModule,
    FieldsModule
  ],
  declarations: [
  ],
  providers: [
    LanguageService
  ]
})
export class InvoicesProductsModule {
  constructor(
    entityActionProviders: EntityActionProviders,
    invoicesProductsEntityProvider: NgInvoicesProductsEntityActionProvider,
  ) {
    entityActionProviders.add(ProductsType.id, invoicesProductsEntityProvider);
  }
}
