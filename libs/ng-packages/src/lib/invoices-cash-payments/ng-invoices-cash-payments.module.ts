import { NgModule } from '@angular/core';

import { NgInvoicesCashPaymentsEpics } from './invoices-cash-payments/redux/ng-invoices-cash-payments-epics';
import { registerRedux, NgMenuItemProviders } from '@skysmack/ng-redux';
import { invoicesCashPaymentsReducer } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsMenuItemProvider } from './ng-invoices-cash-payments-menu-item-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgInvoicesCashPaymentsModule {
  constructor(
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgInvoicesCashPaymentsMenuItemProvider,
    invoicesCashPaymentsEpics: NgInvoicesCashPaymentsEpics
  ) {
    registerRedux('invoicesCashPayments', invoicesCashPaymentsReducer, invoicesCashPaymentsEpics);
    ngMenuItemProviders.add(menuItemProvider);
  }
}
