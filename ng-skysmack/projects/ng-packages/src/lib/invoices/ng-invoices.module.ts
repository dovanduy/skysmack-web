import { NgModule } from '@angular/core';

import { invoicesReducer, invoiceItemsReducer, invoicePaymentsReducer } from '@skysmack/packages-invoices';
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
    registerRedux('invoices', invoicesReducer, invoicesEpics);
    registerRedux('invoiceItems', invoiceItemsReducer, invoiceItemsEpics);
    registerRedux('invoicePayments', invoicePaymentsReducer, invoicePaymentsEpics);
  }
}
