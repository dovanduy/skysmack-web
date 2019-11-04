import { SignalRProvider } from '@skysmack/signal-r';
import { Injectable } from '@angular/core';
import { NgSiteMinderRatePlansActions } from './redux';
import { SITE_MINDER_RATE_PLANS_AREA_KEY } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class SignalRRatePlanProvider implements SignalRProvider {
    public name = SITE_MINDER_RATE_PLANS_AREA_KEY;

    constructor(
        private actions: NgSiteMinderRatePlansActions
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
