import { NgModule } from '@angular/core';
import { siteMinderReducer, SITE_MINDER_REDUCER_KEY } from '@skysmack/packages-siteminder';
import { NgSiteMinderEpics } from './siteminder/redux/ng-siteminder-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgSiteMinderModule {
  constructor(
    epics: NgSiteMinderEpics
  ) {
    registerRedux(SITE_MINDER_REDUCER_KEY, siteMinderReducer, epics);
  }
}
