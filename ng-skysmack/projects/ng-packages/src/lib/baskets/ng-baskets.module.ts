import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { basketsReducer } from '@skysmack/packages-baskets';
import { NgBasketsActions } from './redux/ng-baskets-actions';
import { NgBasketsStore } from './redux/ng-baskets-store';
import { NgBasketsEpics } from './redux/ng-baskets-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgBasketsModule {
  constructor(epics: NgBasketsEpics) {
    ReducerRegistry.Instance.register('baskets', basketsReducer);
    registerEpics(epics);
  }
}
