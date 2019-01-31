import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { invoicesReducer, invoiceItemsReducer, invoicePaymentsReducer } from '@skysmack/packages-invoices';
import { registerEpics } from '@skysmack/ng-redux';
import { NgInvoicesActions } from './invoice/redux/ng-invoices-actions';
import { NgInvoicesStore } from './invoice/redux/ng-invoices-store';
import { NgInvoicesEpics } from './invoice/redux/ng-invoices-epics';
import { NgInvoiceItemsActions } from './invoice-item/redux/ng-invoice-items-actions';
import { NgInvoiceItemsStore } from './invoice-item/redux/ng-invoice-items-store';
import { NgInvoiceItemsEpics } from './invoice-item/redux/ng-invoice-items-epics';
import { NgInvoicePaymentsActions } from './invoice-payment/redux/ng-invoice-payments-actions';
import { NgInvoicePaymentsStore } from './invoice-payment/redux/ng-invoice-payments-store';
import { NgInvoicePaymentsEpics } from './invoice-payment/redux/ng-invoice-payments-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgInvoicesActions', useClass: NgInvoicesActions },
      { provide: 'NgInvoicesStore', useClass: NgInvoicesStore },
      { provide: 'NgInvoiceItemsActions', useClass: NgInvoiceItemsActions },
      { provide: 'NgInvoiceItemsStore', useClass: NgInvoiceItemsStore },
      { provide: 'NgInvoicePaymentsActions', useClass: NgInvoicePaymentsActions },
      { provide: 'NgInvoicePaymentsStore', useClass: NgInvoicePaymentsStore }
    ]
  ],
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
