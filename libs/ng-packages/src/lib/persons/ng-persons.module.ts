import { NgModule } from '@angular/core';

import { personsReducer, PERSONS_REDUCER_KEY } from '@skysmack/packages-persons';
import { NgPersonsEpics } from './persons/redux/ng-persons-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(epics: NgPersonsEpics) {
    registerRedux(PERSONS_REDUCER_KEY, personsReducer, epics);
  }
}
