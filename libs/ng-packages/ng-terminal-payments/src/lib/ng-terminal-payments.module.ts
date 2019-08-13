import { NgModule } from '@angular/core';
import { terminalsReducer, receiptsReducer, TERMINALS_REDUCER_KEY, RECEIPTS_REDUCER_KEY, CONNECTIONS_REDUCER_KEY, connectionsReducer } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './terminals/redux/ng-terminals-epics';
import { ReceiptsEpics } from './receipts/redux/ng-receipts-epics';
import { registerRedux, NgSignalR } from '@skysmack/ng-framework';
import { ConnectionsEpics } from './connections/redux/ng-connections-epics';
import { SignalRConnectionsProvider } from './connections/signal-r-connections-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTerminalPaymentsModule {
  constructor(
    terminalsEpics: TerminalsEpics,
    receiptsEpics: ReceiptsEpics,
    connectionsEpics: ConnectionsEpics,
    signalR: NgSignalR,
    connectionsSRProvider: SignalRConnectionsProvider
  ) {
    // Redux
    registerRedux(TERMINALS_REDUCER_KEY, terminalsReducer, terminalsEpics);
    registerRedux(RECEIPTS_REDUCER_KEY, receiptsReducer, receiptsEpics);
    registerRedux(CONNECTIONS_REDUCER_KEY, connectionsReducer, connectionsEpics);

    // Signal R
    signalR.instance.registerProvider(connectionsSRProvider);
  }
}
