import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { epic$, ReducerRegistry } from '@skysmack/redux';
import { skysmackReducer, SkysmackEpics } from '@skysmack/packages-skysmack';
import { NgSkysmackRequests } from './redux/ng-skysmack-requests';
import { combineEpics } from '@skysmack/packages-skysmack/node_modules/redux-observable';

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
    epic$.next(combineEpics(epic$.getValue(), new SkysmackEpics(skysmackRequests).getEpics()));
  }
}
