import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { terminalsReducer, receiptsReducer } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './redux/ng-terminals-epics';
import { ReceiptsEpics } from './redux/ng-receipts-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTerminalPaymentsModule {
  constructor(terminalsEpics: TerminalsEpics, receiptsEpics: ReceiptsEpics) {
    ReducerRegistry.Instance.register('terminals', terminalsReducer);
    ReducerRegistry.Instance.register('receipts', receiptsReducer);

    registerEpics(terminalsEpics);
    registerEpics(receiptsEpics);
  }
}
