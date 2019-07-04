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
import { CoalescingComponentFactoryResolver, NgMenuItemProviders } from '@skysmack/ng-framework';
import { InvoicesProductsAddToInvoiceComponent } from './invoices-products/components/invoices-products-add-to-invoice/invoices-products-add-to-invoice.component';
import { InvoicesProductsAddProductsComponent } from './invoices-products/components';
import { NgInvoicesProductsMenuItemProvider } from './invoices-products/ng-invoices-products-menu-item-provider';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgDynamicFormsModule,
    InvoicesProductsRoutingModule,
    NgInvoicesProductsModule,
    FieldsModule
  ],
  declarations: [
    ...invoicesProductsComponents,
    InvoicesProductsAddToInvoiceComponent,
    InvoicesProductsAddProductsComponent
  ],
  entryComponents: [
    InvoicesProductsAddToInvoiceComponent,
    InvoicesProductsAddProductsComponent
  ],
  providers: [
    LanguageService
  ]
})
export class InvoicesProductsModule {
  constructor(
    menuItemActionProviders: MenuItemActionProviders,
    invoicesProductsMenuItemActionProvider: NgInvoicesProductsMenuItemActionProvider,
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgInvoicesProductsMenuItemProvider,

    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    menuItemActionProviders.add(ProductsType.id, invoicesProductsMenuItemActionProvider);
    ngMenuItemProviders.add(menuItemProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
