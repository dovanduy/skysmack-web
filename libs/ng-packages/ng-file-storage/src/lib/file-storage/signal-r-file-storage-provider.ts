import { SignalRProvider } from '@skysmack/signal-r';
import { Inject, Injectable } from '@angular/core';
import { NgFileStorageActions } from './redux';
import { FILE_STORAGE_AREA_KEY } from '@skysmack/packages-file-storage';

@Injectable({ providedIn: 'root' })
export class SignalRPersonProvider implements SignalRProvider {
    public name = FILE_STORAGE_AREA_KEY;

    constructor(
        private actions: NgFileStorageActions
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
