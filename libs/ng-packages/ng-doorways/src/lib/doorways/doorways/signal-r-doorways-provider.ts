import { SignalRProvider } from '@skysmack/signal-r';
import { Inject, Injectable } from '@angular/core';
import { NgDoorwaysActions } from './redux';
import { DOORWAYS_AREA_KEY } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class SignalRDoorwayProvider implements SignalRProvider {
    public name = DOORWAYS_AREA_KEY;

    constructor(
        private actions: NgDoorwaysActions
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
