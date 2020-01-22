import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PortalUiModule } from '@skysmack/portal-ui';
import { LodgingReservationsTypeId } from '@skysmack/package-types';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { invoicesLodgingReservationsComponents, invoicesLodgingReservationsEntryComponents } from './components/invoices-lodging-reservations-components';
import { CoalescingComponentFactoryResolver, NgSummaryProviders } from '@skysmack/ng-framework';
import { InvoicesLodgingReservationsRoutingModule } from './invoices-lodging-reservations-routing.module';
import { NgInvoicesLodgingReservationsSummaryProvider } from './components/invoices-lodging-reservations-summary/ng-invoices-lodging-reservations-summary-provider';
import { NgLodgingReservationsInvoicesSummaryProvider } from './components/lodging-reservations-invoices-summary/ng-lodging-reservations-invoices-summary-provider';
import { NgInvoicesLodgingReservationsFieldProvider } from './ng-invoices-lodging-reservations-field-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    InvoicesLodgingReservationsRoutingModule,
    PortalFieldsModule
  ],
  declarations: [
    ...invoicesLodgingReservationsComponents
  ],
  entryComponents: [
    ...invoicesLodgingReservationsEntryComponents
  ],
  providers: []
})
export class InvoicesLodgingReservationsModule {
  constructor(
    invoicesLodgingReservationsSummaryProvider: NgInvoicesLodgingReservationsSummaryProvider,
    lodgingReservationsInvoiceSummaryProvider: NgLodgingReservationsInvoicesSummaryProvider,
    fieldProviders: FieldProviders,
    invoicesLodgingsReservationsFieldProvider: NgInvoicesLodgingReservationsFieldProvider,
    summaryProviders: NgSummaryProviders,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver

  ) {
    fieldProviders.add(LodgingReservationsTypeId, invoicesLodgingsReservationsFieldProvider);
    coalescingResolver.registerResolver(localResolver);
    summaryProviders
      .add(invoicesLodgingReservationsSummaryProvider)
      .add(lodgingReservationsInvoiceSummaryProvider);
  }
}
