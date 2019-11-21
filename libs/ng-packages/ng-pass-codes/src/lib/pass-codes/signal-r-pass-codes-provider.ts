import { SignalRProvider } from '@skysmack/signal-r';
import { Inject, Injectable } from '@angular/core';
import { NgPersonsActions } from './redux';
import { PASS_CODES_AREA_KEY } from '@skysmack/packages-pass-codes';

@Injectable({ providedIn: 'root' })
export class SignalRPersonProvider implements SignalRProvider {
    public name = PASS_CODES_AREA_KEY;

    constructor(
        private actions: NgPersonsActions
    ) { }

    public messageProvided(packagePath: string, message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'Added': {
                    // TODO: What to do?
                    break;
                }
                case 'Updated': {
                    message.ids.forEach(id => this.actions.getSingle(packagePath, id));
                    break;
                }
                case 'Removed': {
                    this.actions.signalRDeleted(packagePath, message.ids);
                    break;
                }
                default: break;
            }
        }
    }
}
