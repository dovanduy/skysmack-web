import { NgModule } from '@angular/core';
import { invoicesReducer, invoiceItemsReducer, invoicePaymentsReducer, INVOICES_REDUCER_KEY, INVOICE_ITEMS_REDUCER_KEY, INVOICE_PAYMENTS_REDUCER_KEY } from '@skysmack/packages-invoices';
import { NgInvoicesEpics } from './invoice/redux/ng-invoices-epics';
import { NgInvoiceItemsEpics } from './invoice-item/redux/ng-invoice-items-epics';
import { NgInvoicePaymentsEpics } from './invoice-payment/redux/ng-invoice-payments-epics';
import { registerRedux } from '@skysmack/ng-framework';

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
    registerRedux(INVOICES_REDUCER_KEY, invoicesReducer, invoicesEpics);
    registerRedux(INVOICE_ITEMS_REDUCER_KEY, invoiceItemsReducer, invoiceItemsEpics);
    registerRedux(INVOICE_PAYMENTS_REDUCER_KEY , invoicePaymentsReducer, invoicePaymentsEpics);
  }
}
