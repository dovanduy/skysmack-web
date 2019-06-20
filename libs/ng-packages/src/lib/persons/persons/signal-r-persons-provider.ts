import { SignalRProvider } from '@skysmack/signal-r';
import { Inject, Injectable } from '@angular/core';
import { PERSONS_AREA_KEY } from 'libs/packages/persons/src';
import { NgPersonsActions } from './redux';

@Injectable({ providedIn: 'root' })
export class SignalRPersonProvider implements SignalRProvider {
    public name = PERSONS_AREA_KEY;

    constructor(
        private actions: NgPersonsActions
    ) { }

    public messageProvided(packagePath: string, message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'Added': {
                    console.log(`Persons with id ${message.ids} was just created!`);
                    break;
                }
                case 'Updated': {
                    console.log(`Persons with id ${message.ids} was just updated!`);
                    break;
                }
                case 'Removed': {
                    this.actions.signalRDeleted(packagePath, message.ids);
                    console.log(`Persons with id ${message.ids} was just deleted!`);
                    break;
                }
                default: break;
            }
        }
    }
}
