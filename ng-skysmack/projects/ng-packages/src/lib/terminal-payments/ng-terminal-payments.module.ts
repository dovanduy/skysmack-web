import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { terminalsReducer, receiptsReducer } from '@skysmack/packages-terminal-payments';
import { NgReceiptsActions } from './redux/ng-receipts-actions';
import { NgReceiptsStore } from './redux/ng-receipts-store';
import { NgTerminalsActions } from './redux/ng-terminals-actions';
import { NgTerminalsStore } from './redux/ng-terminals-store';
import { TerminalsEpics } from './redux/ng-terminals-epics';
import { ReceiptsEpics } from './redux/ng-receipts-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgReceiptsActions', useClass: NgReceiptsActions },
      { provide: 'NgReceiptsStore', useClass: NgReceiptsStore },
      { provide: 'NgTerminalsActions', useClass: NgTerminalsActions },
      { provide: 'NgTerminalsStore', useClass: NgTerminalsStore }
    ]
  ]
})
export class NgTerminalPaymentsModule {
  constructor(terminalsEpics: TerminalsEpics, receiptsEpics: ReceiptsEpics) {
    ReducerRegistry.Instance.register('terminals', terminalsReducer);
    ReducerRegistry.Instance.register('receipts', receiptsReducer);

    registerEpics(terminalsEpics);
    registerEpics(receiptsEpics);
  }
}
