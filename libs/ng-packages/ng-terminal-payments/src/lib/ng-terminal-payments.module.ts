import { NgModule } from '@angular/core';
import { terminalsReducer, receiptsReducer, TERMINALS_REDUCER_KEY, RECEIPTS_REDUCER_KEY, CLIENTS_REDUCER_KEY, clientsReducer, CONNECTIONS_REDUCER_KEY, connectionsReducer } from '@skysmack/packages-terminal-payments';
import { TerminalsEpics } from './terminals/redux/ng-terminals-epics';
import { ReceiptsEpics } from './receipts/redux/ng-receipts-epics';
import { registerRedux, NgSignalR, NgMenuItemProviders } from '@skysmack/ng-framework';
import { ClientsEpics } from './clients/redux/ng-clients-epics';
import { ConnectionsEpics } from './connections/redux/ng-connections-epics';
import { SignalRClientsProvider } from './clients/signal-r-clients-provider';
import { NgInvoicesTerminalPaymentsMenuItemProvider } from './ng-invoices-terminal-payments-menu-item-provider';
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
    clientsEpics: ClientsEpics,
    connectionsEpics: ConnectionsEpics,
    signalR: NgSignalR,
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgInvoicesTerminalPaymentsMenuItemProvider,
    clientsSRProvider: SignalRClientsProvider,
    connectionsSRProvider: SignalRConnectionsProvider
  ) {
    // Redux
    registerRedux(TERMINALS_REDUCER_KEY, terminalsReducer, terminalsEpics);
    registerRedux(RECEIPTS_REDUCER_KEY, receiptsReducer, receiptsEpics);
    registerRedux(CLIENTS_REDUCER_KEY, clientsReducer, clientsEpics);
    registerRedux(CONNECTIONS_REDUCER_KEY, connectionsReducer, connectionsEpics);

    // Signal R
    signalR.instance.registerProvider(clientsSRProvider);
    signalR.instance.registerProvider(connectionsSRProvider);

    // Menu items
    ngMenuItemProviders.add(menuItemProvider);
  }
}
