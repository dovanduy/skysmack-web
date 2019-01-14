import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { PersonsEpics, personsReducer } from '@skysmack/packages-persons';
import { NgPersonsRequests } from './redux/ng-persons-requests';
import { NgPersonsActions } from './redux/ng-persons-actions';
import { NgPersonsStore } from './redux/ng-persons-store';
import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PagedQuery } from '@skysmack/framework';
import { NgPersonsEpics } from './redux/ng-persons-epics';
import { newEpics$ } from '@skysmack/ng-redux';

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
    newEpics$.next(epics);
  }
}
