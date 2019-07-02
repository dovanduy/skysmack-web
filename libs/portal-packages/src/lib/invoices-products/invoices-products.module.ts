import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, EntityActionProviders } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { InvoicesProductsRoutingModule } from './invoices-products-routing.module';
import { NgInvoicesProductsModule } from '@skysmack/ng-packages';
import { NgInvoicesProductsEntityActionProvider } from './ng-invoices-products-entity-action-provider';
import { ProductsType } from '@skysmack/packages-products';
import { invoicesProductsComponents } from './invoices-products/components/invoices-products-components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { InvoicesProductsAddComponent } from './invoices-products/components/invoices-products-add/invoices-products-add.component';

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
    ...invoicesProductsComponents,
    InvoicesProductsAddComponent
  ],
  entryComponents: [
    InvoicesProductsAddComponent,
  ],
  providers: [
    LanguageService
  ]
})
export class InvoicesProductsModule {
  constructor(
    entityActionProviders: EntityActionProviders,
    invoicesProductsEntityProvider: NgInvoicesProductsEntityActionProvider,

    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    entityActionProviders.add(ProductsType.id, invoicesProductsEntityProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
