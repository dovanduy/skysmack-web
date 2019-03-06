import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { lodgingsReducer, lodgingTypesReducer } from '@skysmack/packages-lodgings';
import { registerEpics } from '@skysmack/ng-redux';
import { NgLodgingsEpics } from './redux/ng-lodgings-epics';
import { NgLodgingTypesEpics } from './redux/ng-lodging-types-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgLodgingsModule {
  constructor(
    lodgingsEpics: NgLodgingsEpics,
    lodgingTypesEpics: NgLodgingTypesEpics
  ) {
    ReducerRegistry.Instance.register('lodgings', lodgingsReducer);
    ReducerRegistry.Instance.register('lodgingTypes', lodgingTypesReducer);
    registerEpics(lodgingsEpics);
    registerEpics(lodgingTypesEpics);
  }
}
