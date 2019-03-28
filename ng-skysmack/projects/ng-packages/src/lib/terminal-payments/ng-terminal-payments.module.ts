import { NgModule } from '@angular/core';
import { terminalsReducer, receiptsReducer, RECEIPTS_REDUCER_AREA_KEY, TERMINALS_REDUCER_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './redux/ng-terminals-epics';
import { ReceiptsEpics } from './redux/ng-receipts-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTerminalPaymentsModule {
  constructor(terminalsEpics: TerminalsEpics, receiptsEpics: ReceiptsEpics) {
    registerRedux(TERMINALS_REDUCER_AREA_KEY, terminalsReducer, terminalsEpics);
    registerRedux(RECEIPTS_REDUCER_AREA_KEY, receiptsReducer, receiptsEpics);
  }
}
