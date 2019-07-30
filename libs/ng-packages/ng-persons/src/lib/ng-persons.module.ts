import { NgModule } from '@angular/core';

import { personsReducer, PERSONS_REDUCER_KEY } from '@skysmack/packages-persons';
import { NgPersonsEpics } from './persons/redux/ng-persons-epics';
import { registerRedux, NgSignalR } from '@skysmack/ng-framework';
import { SignalRPersonProvider } from './persons/signal-r-persons-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(
    epics: NgPersonsEpics,
    signalR: NgSignalR,
    personsSRProvider: SignalRPersonProvider
  ) {
    registerRedux(PERSONS_REDUCER_KEY, personsReducer, epics);
    signalR.instance.registerProvider(personsSRProvider);
  }
}
