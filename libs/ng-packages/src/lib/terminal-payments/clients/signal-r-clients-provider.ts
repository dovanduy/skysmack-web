import { SignalRProvider } from '@skysmack/signal-r';
import { Injectable } from '@angular/core';
import { PERSONS_AREA_KEY } from 'libs/packages/persons/src';
import { NgClientsActions } from './redux/ng-clients-actions';
import { ClientOnlineStatusMessage } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class SignalRClientsProvider implements SignalRProvider {
    public name = PERSONS_AREA_KEY;

    constructor(
        private actions: NgClientsActions
    ) { }

    public messageProvided(packagePath: string, message: any): void {
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


