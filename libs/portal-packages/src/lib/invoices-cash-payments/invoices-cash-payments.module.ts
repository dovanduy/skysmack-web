import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, MenuItemActionProviders, NgMenuProviders } from '@skysmack/portal-ui';
import { InvoicesCashPaymentsRoutingModule } from './invoices-cash-payments-routing.module';
import { NgInvoicesCashPaymentsModule } from '@skysmack/ng-invoices-cash-payments';
import { PortalUiModule } from '@skysmack/portal-ui';
import { invoicesCashPaymentsComponents } from './invoices-cash-payments/components/invoices-cash-payments-components';
import { NgInvoicesCashPaymentsMenuItemActionProvider } from './ng-invoices-cash-payments-menu-item-action-provider';
import { InvoicesTypeId } from '@skysmack/package-types';
import { InvoicesCashPaymentsPayComponent } from './invoices-cash-payments/components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgInvoicesCashPaymentsMenuProvider } from './invoices-cash-payments/ng-invoices-cash-payments-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    InvoicesCashPaymentsRoutingModule,
    NgInvoicesCashPaymentsModule,
    PortalFieldsModule
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
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders, 
    ngInvoicesCashpaymentsMenuProvider: NgInvoicesCashPaymentsMenuProvider,
  ) {
    menuItemActionProviders.add(InvoicesTypeId, invoicesCashPaymentsMenuItemActionProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders
    .add(ngInvoicesCashpaymentsMenuProvider)

  }
}
