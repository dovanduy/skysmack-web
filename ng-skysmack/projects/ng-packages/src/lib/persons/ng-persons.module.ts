import { NgModule } from '@angular/core';

import { personsReducer } from '@skysmack/packages-persons';
import { NgPersonsActions } from './redux/ng-persons-actions';
import { NgPersonsStore } from './redux/ng-persons-store';
import { NgPersonsEpics } from './redux/ng-persons-epics';
import { registerRedux } from '@skysmack/ng-redux';
import { NgPersonsFieldsConfig } from './ng-persons-fields-config';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgPersonsActions', useClass: NgPersonsActions },
      { provide: 'NgPersonsStore', useClass: NgPersonsStore },
      { provide: 'NgPersonsFieldsConfig', useClass: NgPersonsFieldsConfig },
    ]
  ],
})
export class NgPersonsModule {
  constructor(epics: NgPersonsEpics) {
    registerRedux('persons', personsReducer, epics);
  }
}
