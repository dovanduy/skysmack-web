import { NgModule } from '@angular/core';
import { terminalsReducer, TERMINALS_REDUCER_KEY, CONNECTIONS_REDUCER_KEY, connectionsReducer, TERMINAL_PAYMENT_RECEIPTS_REDUCER_KEY, terminalPaymentReceiptsReducer, TERMINAL_RECEIPTS_REDUCER_KEY, terminalReceiptsReducer } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './terminals/redux/ng-terminals-epics';
import { registerRedux, NgSignalR } from '@skysmack/ng-framework';
import { ConnectionsEpics } from './connections/redux/ng-connections-epics';
import { SignalRConnectionsProvider } from './connections/signal-r-connections-provider';
import { NgTerminalPaymentReceiptsEpics } from './terminal-payment-receipts/redux/ng-terminal-payment-receipts-epics';
import { NgTerminalReceiptsEpics } from './terminal-receipts/redux/ng-terminal-receipts-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTerminalPaymentsModule {
  constructor(
    terminalsEpics: TerminalsEpics,
    terminalPaymentReceiptsEpics: NgTerminalPaymentReceiptsEpics,
    terminalReceiptsEpics: NgTerminalReceiptsEpics,
    connectionsEpics: ConnectionsEpics,
    // signalR: NgSignalR,
    connectionsSRProvider: SignalRConnectionsProvider
  ) {
    // Redux
    registerRedux(TERMINALS_REDUCER_KEY, terminalsReducer, terminalsEpics);
    registerRedux(TERMINAL_PAYMENT_RECEIPTS_REDUCER_KEY, terminalPaymentReceiptsReducer, terminalPaymentReceiptsEpics);
    registerRedux(TERMINAL_RECEIPTS_REDUCER_KEY, terminalReceiptsReducer, terminalReceiptsEpics);
    registerRedux(CONNECTIONS_REDUCER_KEY, connectionsReducer, connectionsEpics);

    // TODO: REVIEW  SIGNAL-R

    // Signal R
    // signalR.instance.registerProvider(connectionsSRProvider);
  }
}
