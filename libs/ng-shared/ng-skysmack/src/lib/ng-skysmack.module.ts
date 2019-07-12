import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerRedux } from '@skysmack/ng-framework';
import { HttpClientModule } from '@angular/common/http';
import { skysmackReducer, SKYSMACK_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { NgSkysmackRequests } from './redux/ng-skysmack-requests';
import { NgSkysmackEpics } from './redux/ng-skysmack-epics';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [{ provide: 'SkysmackRequests', useClass: NgSkysmackRequests }]
})
export class NgSkysmackModule {
  constructor(epics: NgSkysmackEpics) {
    registerRedux(SKYSMACK_REDUCER_KEY, skysmackReducer, epics);
  }
}
