import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { InvoicesProductsRoutingModule } from './invoices-products-routing.module';
import { NgInvoicesProductsModule } from '@skysmack/ng-packages';

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
    // entityActionProviders: EntityActionProviders,
    // invoicesproductsEntityProvider: NgInvoicesproductsEntityActionProvider,
  ) {
    // entityActionProviders.add(InvoicesProductsType.id, invoicesproductsEntityProvider);
  }
}
