import { SignalRProvider } from '@skysmack/signal-r';
import { Injectable } from '@angular/core';
import { NgClientsActions } from './redux/ng-clients-actions';
import { ClientOnlineStatusMessage, CLIENTS_AREA_KEY } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class SignalRClientsProvider implements SignalRProvider {
    public name = CLIENTS_AREA_KEY;

    constructor(
        private actions: NgClientsActions
    ) { }

    public messageProvided(packagePath: string, message: any): void {
        console.log("new signalr event", packagePath, message);
        if (message.type) {
            switch (message.type) {
                case 'ClientOnlineChanged': {
                    const castedMessage = message as ClientOnlineStatusMessage
                    this.actions.clientOnlineStatusMessage(packagePath, castedMessage.clientId, castedMessage.online);
                    break;
                }
                default: break;
            }
        }
    }
}


