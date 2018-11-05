import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';
import { HttpClientModule } from '@angular/common/http';
import { epic$ } from '@skysmack/redux';
import { ActionsObservable, ofType } from '@skysmack/redux/node_modules/redux-observable';
import { map } from 'rxjs/operators';

@NgModule({
  imports: [
    CommonModule,
    PersonsRoutingModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [],
  declarations: [PersonsIndexComponent]
})
export class PersonsModule {
  constructor() {
    epic$.next(testEpic);
  }
}

const testEpic = (action$: ActionsObservable<any>) => action$.pipe(
  ofType('TEST'),
  map(() => ({ type: 'TEST_SUCCESS' }))
);

