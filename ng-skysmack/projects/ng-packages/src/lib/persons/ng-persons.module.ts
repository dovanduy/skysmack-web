import { NgModule } from '@angular/core';

import { personsReducer, PERSONS_AREA_KEY } from '@skysmack/packages-persons';
import { NgPersonsEpics } from './persons/redux/ng-persons-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(epics: NgPersonsEpics) {
    registerRedux(PERSONS_AREA_KEY, personsReducer, epics);
  }
}
