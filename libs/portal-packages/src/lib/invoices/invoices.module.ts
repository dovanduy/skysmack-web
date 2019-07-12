import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgInvoicesModule } from '@skysmack/ng-packages';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { invoicesComponents } from './invoice/components/invoices-components';
import { invoiceItemsComponents } from './invoice-item/components/invoice-items-components';
import { invoicePaymentsComponents } from './invoice-payment/components/invoice-payments-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';

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
  providers: [
    LanguageService
  ]
})
export class InvoicesModule {
  constructor() { }
}
