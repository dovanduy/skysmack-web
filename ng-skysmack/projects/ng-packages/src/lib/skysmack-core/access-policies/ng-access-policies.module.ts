import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      // { provide: 'NgPersonsActions', useClass: NgPersonsActions },
      // { provide: 'NgPersonsStore', useClass: NgPersonsStore }
    ]
  ],
})
export class NgAccessPoliciesModule {
  constructor(
    // epics: NgPersonsEpics
  ) {
    // ReducerRegistry.Instance.register('persons', personsReducer);
    // registerEpics(epics);
  }
}
