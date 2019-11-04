import { NgSiteMinderRatePlansRequests } from './ng-siteminder-rate-plans-requests';
import { SITE_MINDER_RATE_PLANS_REDUX_KEY, RatePlan } from '@skysmack/packages-siteminder';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgSiteMinderRatePlansNotifications } from '../ng-siteminder-rate-plans-notifications';


@Injectable({ providedIn: 'root' })
export class NgSiteMinderRatePlansEpics extends RecordEpicsBase<RatePlan, number> {
    constructor(protected requests: NgSiteMinderRatePlansRequests, protected notifications: NgSiteMinderRatePlansNotifications) {
        super(requests, SITE_MINDER_RATE_PLANS_REDUX_KEY, notifications);
    }
}
