import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { lodgingsReducer, lodgingTypesReducer } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from './redux/ng-lodgings-actions';
import { NgLodgingsStore } from './redux/ng-lodgings-store';
import { registerEpics } from '@skysmack/ng-redux';
import { NgLodgingsEpics } from './redux/ng-lodgings-epics';
import { NgLodgingTypesEpics } from './redux/ng-lodging-types-epics';

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
