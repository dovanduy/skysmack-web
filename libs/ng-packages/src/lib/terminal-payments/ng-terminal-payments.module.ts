import { NgModule } from '@angular/core';
import { terminalsReducer, receiptsReducer, TERMINALS_REDUCER_KEY, RECEIPTS_REDUCER_KEY, CLIENTS_REDUCER_KEY, clientsReducer } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './terminals/redux/ng-terminals-epics';
import { ReceiptsEpics } from './receipts/redux/ng-receipts-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { ClientsEpics } from './clients/redux/ng-clients-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTerminalPaymentsModule {
  constructor(
    terminalsEpics: TerminalsEpics,
    receiptsEpics: ReceiptsEpics,
    clientsEpics: ClientsEpics,
  ) {
    registerRedux(TERMINALS_REDUCER_KEY, terminalsReducer, terminalsEpics);
    registerRedux(RECEIPTS_REDUCER_KEY, receiptsReducer, receiptsEpics);
    registerRedux(CLIENTS_REDUCER_KEY, clientsReducer, clientsEpics);
  }
}
