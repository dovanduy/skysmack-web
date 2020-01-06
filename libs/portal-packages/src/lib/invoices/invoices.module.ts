import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgInvoicesModule } from '@skysmack/ng-invoices';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';

import { invoicesComponents, invoicesEntryComponents } from './invoice/components/invoices-components';
import { invoiceItemsComponents } from './invoice-item/components/invoice-items-components';
import { invoicePaymentsComponents } from './invoice-payment/components/invoice-payments-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgInvoicesMenuProvider } from './invoice/ng-invoices-menu-provider';
import { CoalescingComponentFactoryResolver, NgSummaryProviders } from '@skysmack/ng-framework';
import { NgInvoicesSummaryProvider } from './invoice/ng-invoices-summary-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    InvoicesRoutingModule,
    NgInvoicesModule,
    PortalFieldsModule
  ],
  declarations: [
    ...invoicesComponents,
    ...invoiceItemsComponents,
    ...invoicePaymentsComponents
  ],
  entryComponents: [
    ...invoicesEntryComponents
  ],
  providers: []
})
export class InvoicesModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngInvoicesMenuProvider: NgInvoicesMenuProvider,
    invoicesSummaryProvider: NgInvoicesSummaryProvider,
    summaryProviders: NgSummaryProviders,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
    summaryProviders.add(invoicesSummaryProvider);
    ngMenuProviders
      .add(ngInvoicesMenuProvider)
  }
}
