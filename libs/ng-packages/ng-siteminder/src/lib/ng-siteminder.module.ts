import { NgModule } from '@angular/core';
import { siteMinderReducer, SITE_MINDER_REDUCER_KEY, SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, SITE_MINDER_RATE_PLANS_REDUCER_KEY, siteMinderRatePlansReducer, SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY, siteMinderChannelManagerReducer } from '@skysmack/packages-siteminder';
import { NgSiteMinderEpics } from './siteminder/redux/ng-siteminder-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { NgSiteMinderChannelsEpics } from './channels/redux/ng-siteminder-channels-epics';
import { NgSiteMinderRatePlansEpics } from './rate-plans/redux/ng-siteminder-rate-plans-epics';
import { NgSiteMinderChannelManagerEpics } from './channel-manager/redux/ng-siteminder-channel-manager-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgSiteMinderModule {
  constructor(
    siteMinderEpics: NgSiteMinderEpics,
    siteMinderChannelManagerEpics: NgSiteMinderChannelManagerEpics,
    channelsEpics: NgSiteMinderChannelsEpics,
    ratePlansEpics: NgSiteMinderRatePlansEpics
  ) {
    registerRedux(SITE_MINDER_REDUCER_KEY, siteMinderReducer, siteMinderEpics);
    registerRedux(SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY, siteMinderChannelManagerReducer, siteMinderChannelManagerEpics);
    registerRedux(SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, channelsEpics);
    registerRedux(SITE_MINDER_RATE_PLANS_REDUCER_KEY, siteMinderRatePlansReducer, ratePlansEpics);
  }
}
