import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReducerRegistry } from '@skysmack/redux';
import { skysmackReducer } from '@skysmack/packages-skysmack-core';
import { NgSkysmackRequests } from './redux/ng-skysmack-requests';
import { NgSkysmackEpics } from './redux/ng-skysmack-epics';
import { registerEpics, registerRedux } from '@skysmack/ng-redux';

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
    registerRedux('skysmack', skysmackReducer, epics);
  }
}
