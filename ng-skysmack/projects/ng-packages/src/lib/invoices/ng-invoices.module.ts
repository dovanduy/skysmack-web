import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { invoicesReducer } from '@skysmack/packages-invoices';
import { NgInvoicesActions } from './redux/ng-invoices-actions';
import { NgInvoicesStore } from './redux/ng-invoices-store';
import { NgInvoicesEpics } from './redux/ng-invoices-epics';
import { registerEpics } from '@skysmack/ng-redux';

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
