import { NgModule } from '@angular/core';

import { epic$, ReducerRegistry, registerWithRootEpic } from '@skysmack/redux';
import { PersonsEpics, personsReducer } from '@skysmack/packages-persons';
import { NgPersonsRequests } from './redux/ng-persons-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(personsRequests: NgPersonsRequests) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    registerWithRootEpic(new PersonsEpics(personsRequests).epics);
  }
}
