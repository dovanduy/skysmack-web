import { NgModule } from '@angular/core';

import { basketsReducer } from '@skysmack/packages-baskets';
import { NgBasketsEpics } from './redux/ng-baskets-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgBasketsModule {
  constructor(epics: NgBasketsEpics) {
    registerRedux('baskets', basketsReducer, epics);
  }
}
