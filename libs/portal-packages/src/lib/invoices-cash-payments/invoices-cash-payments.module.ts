import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { InvoicesCashPaymentsRoutingModule } from './invoices-cash-payments-routing.module';
import { NgInvoicesCashPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { invoicesCashPaymentsComponents } from './invoices-cash-payments/components/invoices-cash-payments-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    InvoicesCashPaymentsRoutingModule,
    NgInvoicesCashPaymentsModule,
    FieldsModule
  ],
  declarations: [
    ...invoicesCashPaymentsComponents,
  ],
  providers: [
    LanguageService
  ]
})
export class InvoicesCashPaymentsModule {
  constructor() { }
}
