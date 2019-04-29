import { NgModule } from '@angular/core';
import { terminalsReducer, receiptsReducer } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './terminals/redux/ng-terminals-epics';
import { ReceiptsEpics } from './receipts/redux/ng-receipts-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTerminalPaymentsModule {
  constructor(terminalsEpics: TerminalsEpics, receiptsEpics: ReceiptsEpics) {
    registerRedux('terminals', terminalsReducer, terminalsEpics);
    registerRedux('reciepts', receiptsReducer, receiptsEpics);
  }
}
