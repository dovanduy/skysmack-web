import { NgModule } from '@angular/core';

import { ReducerRegistry, registerWithRootEpic } from '@skysmack/redux';
import { LodgingsEpics, lodgingsReducer, lodgingTypesReducer, LodgingTypesEpics } from '@skysmack/packages-lodgings';
import { NgLodgingsRequests } from './redux/ng-lodgings-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgLodgingsModule {
  constructor(lodgingsRequests: NgLodgingsRequests, lodgingTypesRequests: NgLodgingsRequests) {
    ReducerRegistry.Instance.register('lodgings', lodgingsReducer);
    registerWithRootEpic(new LodgingsEpics(lodgingsRequests).epics);

    ReducerRegistry.Instance.register('lodgingTypes', lodgingTypesReducer);
    registerWithRootEpic(new LodgingTypesEpics(lodgingTypesRequests).epics);
  }
}
