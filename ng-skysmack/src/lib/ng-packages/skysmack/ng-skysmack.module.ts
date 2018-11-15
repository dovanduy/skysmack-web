import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReducerRegistry, registerWithRootEpic } from '@skysmack/redux';
import { skysmackReducer, SkysmackEpics } from '@skysmack/packages-skysmack';
import { NgSkysmackRequests } from './redux/ng-skysmack-requests';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [],
})
export class NgSkysmackModule {
  constructor(skysmackRequests: NgSkysmackRequests) {
    ReducerRegistry.Instance.register('skysmack', skysmackReducer);
    registerWithRootEpic(new SkysmackEpics(skysmackRequests).epics);
  }
}
