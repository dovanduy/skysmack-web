import { NgModule } from '@angular/core';
import { siteMinderReducer, SITE_MINDER_REDUCER_KEY, SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, SITE_MINDER_RATE_PLANS_REDUCER_KEY, siteMinderRatePlansReducer } from '@skysmack/packages-siteminder';
import { NgSiteMinderEpics } from './siteminder/redux/ng-siteminder-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { NgSiteMinderChannelsEpics } from './channels/redux/ng-siteminder-channels-epics';
import { NgSiteMinderRatePlansEpics } from './rate-plans/redux/ng-siteminder-rate-plans-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgSiteMinderModule {
  constructor(
    siteMinderEpics: NgSiteMinderEpics,
    channelsEpics: NgSiteMinderChannelsEpics,
    ratePlansEpics: NgSiteMinderRatePlansEpics
  ) {
    registerRedux(SITE_MINDER_REDUCER_KEY, siteMinderReducer, siteMinderEpics);
    registerRedux(SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, channelsEpics);
    registerRedux(SITE_MINDER_RATE_PLANS_REDUCER_KEY, siteMinderRatePlansReducer, ratePlansEpics);
  }
}
