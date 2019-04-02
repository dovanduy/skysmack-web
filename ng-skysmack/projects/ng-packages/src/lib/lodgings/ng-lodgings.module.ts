import { NgModule } from '@angular/core';

import { lodgingsReducer, lodgingTypesReducer } from '@skysmack/packages-lodgings';
import { registerRedux } from '@skysmack/ng-redux';
import { NgLodgingsEpics } from './redux/ng-lodgings-epics';
import { NgLodgingTypesEpics } from './redux/ng-lodging-types-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgLodgingsModule {
  constructor(
    lodgingsEpics: NgLodgingsEpics,
    lodgingTypesEpics: NgLodgingTypesEpics
  ) {
    registerRedux('lodgings', lodgingsReducer, lodgingsEpics);
    registerRedux('lodgingTypes', lodgingTypesReducer, lodgingTypesEpics);
  }
}
