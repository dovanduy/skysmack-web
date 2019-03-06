import { NgModule } from '@angular/core';

import { personsReducer } from '@skysmack/packages-persons';
import { NgPersonsEpics } from './redux/ng-persons-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(epics: NgPersonsEpics) {
    registerRedux('persons', personsReducer, epics);
  }
}
