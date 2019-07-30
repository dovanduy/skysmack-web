import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, MenuItemActionProviders } from '@skysmack/portal-ui';
import { PortalUiModule } from '@skysmack/portal-ui';
import { InvoicesProductsRoutingModule } from './invoices-products-routing.module';
import { NgInvoicesProductsModule } from '@skysmack/ng-invoices-products';
import { NgInvoicesProductsMenuItemActionProvider } from './ng-invoices-products-menu-item-action-provider';
import { ProductsTypeId } from '@skysmack/package-types';
import { invoicesProductsComponents } from './invoices-products/components/invoices-products-components';
import { CoalescingComponentFactoryResolver, NgMenuItemProviders } from '@skysmack/ng-framework';
import { InvoicesProductsAddToInvoiceComponent } from './invoices-products/components/invoices-products-add-to-invoice/invoices-products-add-to-invoice.component';
import { InvoicesProductsAddProductsComponent } from './invoices-products/components';
import { NgInvoicesProductsMenuItemProvider } from './invoices-products/ng-invoices-products-menu-item-provider';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    InvoicesProductsRoutingModule,
    NgInvoicesProductsModule,
    PortalFieldsModule
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
    menuItemActionProviders.add(ProductsTypeId, invoicesProductsMenuItemActionProvider);
    ngMenuItemProviders.add(menuItemProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}