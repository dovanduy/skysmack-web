import { SignalRProvider } from '@skysmack/signal-r';
import { Injectable } from '@angular/core';
import { NgSiteMinderChannelsActions } from './redux';
import { SITE_MINDER_CHANNELS_AREA_KEY } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class SignalRChannelProvider implements SignalRProvider {
    public name = SITE_MINDER_CHANNELS_AREA_KEY;

    constructor(
        private actions: NgSiteMinderChannelsActions
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
