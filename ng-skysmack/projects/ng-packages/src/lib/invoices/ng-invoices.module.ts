import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { invoicesReducer, invoiceItemsReducer, invoicePaymentsReducer } from '@skysmack/packages-invoices';
import { registerEpics } from '@skysmack/ng-redux';
import { NgInvoicesEpics } from './invoice/redux/ng-invoices-epics';
import { NgInvoiceItemsEpics } from './invoice-item/redux/ng-invoice-items-epics';
import { NgInvoicePaymentsEpics } from './invoice-payment/redux/ng-invoice-payments-epics';

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
    ReducerRegistry.Instance.register('invoices', invoicesReducer);
    ReducerRegistry.Instance.register('invoiceItems', invoiceItemsReducer);
    ReducerRegistry.Instance.register('invoicePayments', invoicePaymentsReducer);
    registerEpics(invoicesEpics);
    registerEpics(invoiceItemsEpics);
    registerEpics(invoicePaymentsEpics);
  }
}
