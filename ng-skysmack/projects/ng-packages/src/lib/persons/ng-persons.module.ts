import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { personsReducer } from '@skysmack/packages-persons';
import { NgPersonsActions } from './redux/ng-persons-actions';
import { NgPersonsStore } from './redux/ng-persons-store';
import { NgPersonsEpics } from './redux/ng-persons-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgPersonsActions', useClass: NgPersonsActions },
      { provide: 'NgPersonsStore', useClass: NgPersonsStore }
    ]
  ],
})
export class NgPersonsModule {
  constructor(epics: NgPersonsEpics) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    registerEpics(epics);
  }
}
