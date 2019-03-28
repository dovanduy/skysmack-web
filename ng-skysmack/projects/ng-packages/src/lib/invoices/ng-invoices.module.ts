import { NgModule } from '@angular/core';

import { invoicesReducer, invoiceItemsReducer, invoicePaymentsReducer, INVOICES_AREA_KEY, INVOICE_ITEMS_AREA_KEY, INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';
import { NgInvoicesEpics } from './invoice/redux/ng-invoices-epics';
import { NgInvoiceItemsEpics } from './invoice-item/redux/ng-invoice-items-epics';
import { NgInvoicePaymentsEpics } from './invoice-payment/redux/ng-invoice-payments-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgInvoicesModule {
  constructor(
    invoicesEpics: NgInvoicesEpics,
    invoiceItemsEpics: NgInvoiceItemsEpics,
    invoicePaymentsEpics: NgInvoicePaymentsEpics
  ) {
    registerRedux(INVOICES_AREA_KEY, invoicesReducer, invoicesEpics);
    registerRedux(INVOICE_ITEMS_AREA_KEY, invoiceItemsReducer, invoiceItemsEpics);
    registerRedux(INVOICE_PAYMENTS_AREA_KEY, invoicePaymentsReducer, invoicePaymentsEpics);
  }
}
