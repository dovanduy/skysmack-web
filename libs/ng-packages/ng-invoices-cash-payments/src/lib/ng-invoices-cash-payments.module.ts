import { NgModule } from '@angular/core';
import { NgInvoicesCashPaymentsEpics } from './invoices-cash-payments/redux/ng-invoices-cash-payments-epics';
import { registerRedux, NgMenuItemProviders } from '@skysmack/ng-framework';
import { invoicesCashPaymentsReducer, INVOICES_CASH_PAYMENTS_REDUCER_KEY } from '@skysmack/packages-invoices-cash-payments';
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
    invoicesCashPaymentsEpics: NgInvoicesCashPaymentsEpics,
  ) {
    registerRedux(INVOICES_CASH_PAYMENTS_REDUCER_KEY, invoicesCashPaymentsReducer, invoicesCashPaymentsEpics);
    ngMenuItemProviders.add(menuItemProvider);
  }
}
