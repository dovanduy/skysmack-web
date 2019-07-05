import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, MenuItemActionProviders } from '@skysmack/portal-ui';
import { InvoicesCashPaymentsRoutingModule } from './invoices-cash-payments-routing.module';
import { NgInvoicesCashPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { invoicesCashPaymentsComponents } from './invoices-cash-payments/components/invoices-cash-payments-components';
import { NgInvoicesCashPaymentsMenuItemActionProvider } from './ng-invoices-cash-payments-menu-item-action-provider';
import { InvoicesType } from '@skysmack/packages-invoices';
import { InvoicesCashPaymentsPayComponent } from './invoices-cash-payments/components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    InvoicesCashPaymentsRoutingModule,
    NgInvoicesCashPaymentsModule,
    FieldsModule
  ],
  declarations: [
    ...invoicesCashPaymentsComponents,
  ],
  entryComponents: [
    InvoicesCashPaymentsPayComponent
  ],
  providers: [
    LanguageService
  ]
})
export class InvoicesCashPaymentsModule {
  constructor(
    menuItemActionProviders: MenuItemActionProviders,
    invoicesCashPaymentsMenuItemActionProvider: NgInvoicesCashPaymentsMenuItemActionProvider,
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    menuItemActionProviders.add(InvoicesType.id, invoicesCashPaymentsMenuItemActionProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
