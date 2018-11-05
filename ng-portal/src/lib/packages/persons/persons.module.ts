import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';
import { HttpClientModule } from '@angular/common/http';
import { epic$, ReducerRegistry } from '@skysmack/redux';
import { personsReducer } from './redux/persons-reducer';
import { NgPersonsEpics } from './redux';

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
  constructor(ngPersonsEpics: NgPersonsEpics) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    epic$.next(ngPersonsEpics.getEpics());
  }
}
