import { NgModule } from '@angular/core';

import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { PersonsEpics, personsReducer } from '@skysmack/packages-persons';
import { NgPersonsRequests } from './redux/ng-persons-requests';
import { NgPersonsActions, NgPersonsStore } from './redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'PersonsActions', useClass: NgPersonsActions },
      { provide: 'PersonsStore', useClass: NgPersonsStore }
    ]
  ],
})
export class NgPersonsModule {
  constructor(personsRequests: NgPersonsRequests) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    registerLazyEpics(new PersonsEpics(personsRequests).epics);
  }
}
