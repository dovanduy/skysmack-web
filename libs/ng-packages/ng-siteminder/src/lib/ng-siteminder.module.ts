import { NgModule } from '@angular/core';
import { siteMinderReducer, SITE_MINDER_REDUCER_KEY, SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer } from '@skysmack/packages-siteminder';
import { NgSiteMinderEpics } from './siteminder/redux/ng-siteminder-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { NgSiteMinderChannelsEpics } from './channels/redux/ng-siteminder-channels-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgSiteMinderModule {
  constructor(
    siteMinderEpics: NgSiteMinderEpics,
    channelsEpics: NgSiteMinderChannelsEpics
  ) {
    registerRedux(SITE_MINDER_REDUCER_KEY, siteMinderReducer, siteMinderEpics);
    registerRedux(SITE_MINDER_CHANNELS_REDUCER_KEY, siteMinderChannelsReducer, channelsEpics);
  }
}
