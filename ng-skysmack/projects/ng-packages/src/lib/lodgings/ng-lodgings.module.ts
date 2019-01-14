import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { LodgingsEpics, lodgingsReducer, lodgingTypesReducer, LodgingTypesEpics } from '@skysmack/packages-lodgings';
import { NgLodgingsRequests } from './redux/ng-lodgings-requests';
import { NgLodgingTypesRequests } from './redux/ng-lodging-types-requests';
import { NgLodgingsActions } from './redux/ng-lodgings-actions';
import { NgLodgingsStore } from './redux/ng-lodgings-store';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgLodgingsActions', useClass: NgLodgingsActions },
      { provide: 'NgLodgingsStore', useClass: NgLodgingsStore }
    ]
  ],
})
export class NgLodgingsModule {
  constructor(lodgingsRequests: NgLodgingsRequests, lodgingTypesRequests: NgLodgingTypesRequests) {
    ReducerRegistry.Instance.register('lodgings', lodgingsReducer);
    // registerLazyEpics(new LodgingsEpics(lodgingsRequests).epics);

    ReducerRegistry.Instance.register('lodgingTypes', lodgingTypesReducer);
    // registerLazyEpics(new LodgingTypesEpics(lodgingTypesRequests).epics);
  }
}
