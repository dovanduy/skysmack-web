import { NgModule } from '@angular/core';

import { lodgingsReducer, lodgingTypesReducer, LODGING_TYPES_REDUCER_KEY, LODGINGS_REDUCER_KEY } from '@skysmack/packages-lodgings';
import { registerRedux } from '@skysmack/ng-framework';
import { NgLodgingsEpics } from './lodgings/redux/ng-lodgings-epics';
import { NgLodgingTypesEpics } from './lodging-types/redux/ng-lodging-types-epics';

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
    registerRedux(LODGINGS_REDUCER_KEY, lodgingsReducer, lodgingsEpics);
    registerRedux(LODGING_TYPES_REDUCER_KEY, lodgingTypesReducer, lodgingTypesEpics);
  }
}
