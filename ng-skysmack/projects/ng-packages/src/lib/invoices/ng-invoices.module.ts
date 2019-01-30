import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { invoicesReducer } from '@skysmack/packages-invoices';
import { registerEpics } from '@skysmack/ng-redux';
import { NgInvoicesActions } from './invoice/redux/ng-invoices-actions';
import { NgInvoicesStore } from './invoice/redux/ng-invoices-store';
import { NgInvoicesEpics } from './invoice/redux/ng-invoices-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgInvoicesActions', useClass: NgInvoicesActions },
      { provide: 'NgInvoicesStore', useClass: NgInvoicesStore }
    ]
  ],
})
export class NgInvoicesModule {
  constructor(epics: NgInvoicesEpics) {
    ReducerRegistry.Instance.register('invoices', invoicesReducer);
    registerEpics(epics);
  }
}
