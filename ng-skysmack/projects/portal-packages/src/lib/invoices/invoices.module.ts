import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgInvoicesModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { invoicesComponents } from './invoice/components/invoices-components';
import { invoiceItemsComponents } from './invoice-item/components/invoice-items-components';
import { invoicePaymentsComponents } from './invoice-payment/components/invoice-payments-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    InvoicesRoutingModule,
    NgInvoicesModule,
    FieldsModule
  ],
  declarations: [
    ...invoicesComponents,
    ...invoiceItemsComponents,
    ...invoicePaymentsComponents
  ],
  providers: [
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class InvoicesModule {
  constructor(public languageService: LanguageService) { }
}
