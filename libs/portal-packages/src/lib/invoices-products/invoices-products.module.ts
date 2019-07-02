import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, MenuItemActionProviders } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { InvoicesProductsRoutingModule } from './invoices-products-routing.module';
import { NgInvoicesProductsModule } from '@skysmack/ng-packages';
import { NgInvoicesProductsMenuItemActionProvider } from './ng-invoices-products-menu-item-action-provider';
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
    menuItemActionProviders: MenuItemActionProviders,
    invoicesProductsMenuItemActionProvider: NgInvoicesProductsMenuItemActionProvider,

    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    menuItemActionProviders.add(ProductsType.id, invoicesProductsMenuItemActionProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
