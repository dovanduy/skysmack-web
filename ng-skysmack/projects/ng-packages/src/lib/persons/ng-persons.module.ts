import { NgModule } from '@angular/core';

import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { PersonsEpics, personsReducer } from '@skysmack/packages-persons';
import { NgPersonsRequests } from './redux/ng-persons-requests';
import { NgPersonsActions } from './redux/ng-persons-actions';
import { NgPersonsStore } from './redux/ng-persons-store';

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
  constructor(personsRequests: NgPersonsRequests) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    registerLazyEpics(new PersonsEpics(personsRequests).epics);
  }
}
