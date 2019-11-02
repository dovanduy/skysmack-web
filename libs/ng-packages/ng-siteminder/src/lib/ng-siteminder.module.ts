import { NgModule } from '@angular/core';
import { siteMinderReducer, SITE_MINDER_REDUCER_KEY, SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, SITE_MINDER_RATE_PLANS_REDUCER_KEY, siteMinderRatePlansReducer, SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY, siteMinderChannelManagerReducer, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUCER_KEY, siteMinderLodgingTypeRatePlanChannelsReducer, siteMinderLodgingTypeRatePlansReducer, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUCER_KEY } from '@skysmack/packages-siteminder';
import { NgSiteMinderEpics } from './siteminder/redux/ng-siteminder-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { NgSiteMinderChannelsEpics } from './channels/redux/ng-siteminder-channels-epics';
import { NgSiteMinderRatePlansEpics } from './rate-plans/redux/ng-siteminder-rate-plans-epics';
import { NgSiteMinderChannelManagerEpics } from './channel-manager/redux/ng-siteminder-channel-manager-epics';
import { NgSiteMinderLodgingTypeRatePlanChannelsEpics } from './lodging-type-rate-plan-channels/redux/ng-siteminder-lodging-type-rate-plan-channels-epics';
import { NgSiteMinderLodgingTypeRatePlansEpics } from './lodging-type-rate-plans/redux/ng-siteminder-lodging-type-rate-plans-epics';

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
    ratePlansEpics: NgSiteMinderRatePlansEpics,
    lodgingTypeRatePlanChannelsEpics: NgSiteMinderLodgingTypeRatePlanChannelsEpics,
    lodgingTypeRatePlansEpics: NgSiteMinderLodgingTypeRatePlansEpics
  ) {
    registerRedux(SITE_MINDER_REDUCER_KEY, siteMinderReducer, siteMinderEpics);
    registerRedux(SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY, siteMinderChannelManagerReducer, siteMinderChannelManagerEpics);
    registerRedux(SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, channelsEpics);
    registerRedux(SITE_MINDER_RATE_PLANS_REDUCER_KEY, siteMinderRatePlansReducer, ratePlansEpics);
    registerRedux(SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUCER_KEY, siteMinderLodgingTypeRatePlanChannelsReducer, lodgingTypeRatePlanChannelsEpics);
    registerRedux(SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUCER_KEY, siteMinderLodgingTypeRatePlansReducer, lodgingTypeRatePlansEpics);
  }
}
