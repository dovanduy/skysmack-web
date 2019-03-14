import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { basketsReducer } from '@skysmack/packages-baskets';
import { NgBasketsEpics } from './redux/ng-baskets-epics';
import { registerEpics, registerRedux } from '@skysmack/ng-redux';

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
