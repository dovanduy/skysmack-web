import { NgModule } from '@angular/core';

import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { LodgingsEpics, lodgingsReducer, lodgingTypesReducer, LodgingTypesEpics } from '@skysmack/packages-lodgings';
import { NgLodgingsRequests } from './redux/ng-lodgings-requests';
import { NgLodgingTypesRequests } from './redux/ng-lodging-types-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgLodgingsModule {
  constructor(lodgingsRequests: NgLodgingsRequests, lodgingTypesRequests: NgLodgingTypesRequests) {
    ReducerRegistry.Instance.register('lodgings', lodgingsReducer);
    registerLazyEpics(new LodgingsEpics(lodgingsRequests).epics);

    ReducerRegistry.Instance.register('lodgingTypes', lodgingTypesReducer);
    registerLazyEpics(new LodgingTypesEpics(lodgingTypesRequests).epics);
  }
}
