import { NgSiteMinderChannelsRequests } from './ng-siteminder-channels-requests';
import { SITE_MINDER_CHANNELS_REDUX_KEY, Channel } from '@skysmack/packages-siteminder';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgSiteMinderChannelsNotifications } from '../ng-siteminder-channels-notifications';


@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelsEpics extends RecordEpicsBase<Channel, number> {
    constructor(protected requests: NgSiteMinderChannelsRequests, protected notifications: NgSiteMinderChannelsNotifications) {
        super(requests, SITE_MINDER_CHANNELS_REDUX_KEY, notifications);
    }
}
