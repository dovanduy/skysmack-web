import { SignalRProvider } from '@skysmack/signal-r';
import { Injectable } from '@angular/core';
import { CONNECTIONS_AREA_KEY, TerminalStatusChangedMessage } from '@skysmack/packages-terminal-payments';
import { NgConnectionsActions } from './redux/ng-connections-actions';

@Injectable({ providedIn: 'root' })
export class SignalRConnectionsProvider implements SignalRProvider {
    public name = CONNECTIONS_AREA_KEY;

    constructor(
        private actions: NgConnectionsActions
    ) { }

    public messageProvided(packagePath: string, message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'TerminalStatusChanged': {
                    const castedMessage = message as TerminalStatusChangedMessage;
                    this.actions.terminalStatusChangedMessage(packagePath, castedMessage);
                    break;
                }
                default: break;
            }
        }
    }
}


