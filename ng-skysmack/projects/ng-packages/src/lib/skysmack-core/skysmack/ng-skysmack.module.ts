import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReducerRegistry } from '@skysmack/redux';
// import { epic$ } from '@skysmack/ng-redux';
import { skysmackReducer, SkysmackEpics } from '@skysmack/packages-skysmack-core';
import { NgSkysmackRequests } from './redux/ng-skysmack-requests';

// @Injectable({ providedIn: 'root' })
// export class NgSkysmackEpics extends SkysmackEpics {
//   constructor(requests: NgSkysmackRequests) {
//     super(requests);
//   }
// }

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [{ provide: 'SkysmackRequests', useClass: NgSkysmackRequests }]
})
export class NgSkysmackModule {
  constructor() {
    ReducerRegistry.Instance.register('skysmack', skysmackReducer);
    // lazyEpics$.next(SkysmackRequests);
    // const epics = new SkysmackEpics(skysmackRequests);
    // for (let index = 0; index < epics.epics.length; index++) {
    //   epic$.next(epics.epics[index]);
    // }
  }
}
