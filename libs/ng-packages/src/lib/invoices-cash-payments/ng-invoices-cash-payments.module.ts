import { NgModule } from '@angular/core';

import { NgInvoicesCashPaymentsEpics } from './invoices-cash-payments/redux/ng-invoices-cash-payments-epics';
import { registerRedux } from '@skysmack/ng-redux';
import { invoicesCashPaymentsReducer } from '@skysmack/packages-invoices-cash-payments';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgInvoicesCashPaymentsModule {
  constructor(
    invoicesCashPaymentsEpics: NgInvoicesCashPaymentsEpics
  ) {
    registerRedux('invoicesCashPayments', invoicesCashPaymentsReducer, invoicesCashPaymentsEpics);
  }
}
