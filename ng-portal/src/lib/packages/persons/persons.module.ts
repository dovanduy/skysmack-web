import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';
import { HttpClientModule } from '@angular/common/http';
import { epic$, ReducerRegistry } from '@skysmack/redux';
import { PersonsEpics, personsReducer } from '@skysmack/packages-persons';
import { PersonsRequests } from './redux/persons-requests';

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
  constructor(personsRequests: PersonsRequests) {
    ReducerRegistry.Instance.register('persons', personsReducer);
    epic$.next(new PersonsEpics(personsRequests).getEpics());
  }
}
