import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { epic$, ReducerRegistry } from '@skysmack/redux';
import { PersonsEpics, personsReducer } from '@skysmack/packages-persons';
import { NgPersonsRequests } from './redux/ng-persons-requests';
import { combineEpics } from 'redux-observable';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(personsRequests: NgPersonsRequests) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    epic$.next(combineEpics(epic$.getValue(), new PersonsEpics(personsRequests).getEpics()));
  }
}
