import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Channel, SiteMinderChannelsAppState, SITE_MINDER_CHANNELS_REDUCER_KEY } from '@skysmack/packages-siteminder';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelsStore extends NgRecordStore<SiteMinderChannelsAppState, Channel, number> {
    constructor(
        protected ngRedux: NgRedux<SiteMinderChannelsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, SITE_MINDER_CHANNELS_REDUCER_KEY); }
}
