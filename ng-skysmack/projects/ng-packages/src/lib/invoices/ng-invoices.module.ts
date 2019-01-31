import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { invoicesReducer, invoiceItemsReducer } from '@skysmack/packages-invoices';
import { registerEpics } from '@skysmack/ng-redux';
import { NgInvoicesActions } from './invoice/redux/ng-invoices-actions';
import { NgInvoicesStore } from './invoice/redux/ng-invoices-store';
import { NgInvoicesEpics } from './invoice/redux/ng-invoices-epics';
import { NgInvoiceItemsActions } from './invoice-item/redux/ng-invoice-items-actions';
import { NgInvoiceItemsStore } from './invoice-item/redux/ng-invoice-items-store';
import { NgInvoiceItemsEpics } from './invoice-item/redux/ng-invoice-items-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgInvoicesActions', useClass: NgInvoicesActions },
      { provide: 'NgInvoicesStore', useClass: NgInvoicesStore },
      { provide: 'NgInvoiceItemsActions', useClass: NgInvoiceItemsActions },
      { provide: 'NgInvoiceItemsStore', useClass: NgInvoiceItemsStore }
    ]
  ],
})
export class NgInvoicesModule {
  constructor(
    invoicesEpics: NgInvoicesEpics,
    invoiceItemsEpics: NgInvoiceItemsEpics
  ) {
    ReducerRegistry.Instance.register('invoices', invoicesReducer);
    ReducerRegistry.Instance.register('invoiceItems', invoiceItemsReducer);
    registerEpics(invoicesEpics);
    registerEpics(invoiceItemsEpics);
  }
}
