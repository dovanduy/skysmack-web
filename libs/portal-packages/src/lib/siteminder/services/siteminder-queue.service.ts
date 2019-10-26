import { Injectable } from '@angular/core';
import { NgSiteMinderChannelManagerActions } from '@skysmack/ng-siteminder';
import { Rate, Availability } from '@skysmack/packages-siteminder';
import { toLocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class SiteMinderQueueService {
    constructor(
        private actions: NgSiteMinderChannelManagerActions
    ) { }

    public updateAvailability(packagePath: string, availability: Availability): void {
        this.actions.updateAvailability(packagePath, toLocalObject(availability));
    }

    public updateRates(packagePath: string, rates: Rate[]): void {
        rates.forEach(rate => {
            this.actions.updateRate(packagePath, toLocalObject(rate)); // TODO: Make flow accept Rates instead of rates wrapped in local objects.
        })
    }
}