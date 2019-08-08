import { NgModule } from '@angular/core';
import { NgInvoicesCashPaymentsEpics } from './invoices-cash-payments/redux/ng-invoices-cash-payments-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { invoicesCashPaymentsReducer, INVOICES_CASH_PAYMENTS_REDUCER_KEY } from '@skysmack/packages-invoices-cash-payments';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgInvoicesCashPaymentsModule {
  constructor(
    invoicesCashPaymentsEpics: NgInvoicesCashPaymentsEpics,
  ) {
    registerRedux(INVOICES_CASH_PAYMENTS_REDUCER_KEY, invoicesCashPaymentsReducer, invoicesCashPaymentsEpics);
  }
}
