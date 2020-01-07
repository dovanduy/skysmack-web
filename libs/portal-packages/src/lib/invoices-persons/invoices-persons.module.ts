import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgInvoicesModule } from '@skysmack/ng-invoices';
import { PortalUiModule } from '@skysmack/portal-ui';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver, NgSummaryProviders } from '@skysmack/ng-framework';
import { InvoicesPersonsRoutingModule } from './invoices-persons-routing.module';
import { invoicesPersonsComponents, invoicesPersonsEntryComponents } from './invoices-persons/components/invoices-persons-components';
import { NgInvoicesPersonsSummaryProvider } from './invoices-persons/components/invoices-persons-summary/ng-invoices-persons-summary-provider';
import { NgPersonsInvoicesSummaryProvider } from './invoices-persons/components/persons-invoices-summary/ng-persons-invoice-summary-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    InvoicesPersonsRoutingModule,
    NgInvoicesModule,
    PortalFieldsModule
  ],
  declarations: [
    ...invoicesPersonsComponents,
  ],
  entryComponents: [
    ...invoicesPersonsEntryComponents
  ],
  providers: []
})
export class InvoicesPersonsModule {
  constructor(
    invoicesPersonsSummaryProvider: NgInvoicesPersonsSummaryProvider,
    personsInvoicesSummaryProvider: NgPersonsInvoicesSummaryProvider,
    summaryProviders: NgSummaryProviders,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
    summaryProviders
      .add(invoicesPersonsSummaryProvider)
      .add(personsInvoicesSummaryProvider);
  }
}
