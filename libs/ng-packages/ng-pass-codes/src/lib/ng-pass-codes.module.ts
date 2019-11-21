import { NgModule } from '@angular/core';
import { passCodesReducer, PASS_CODES_REDUCER_KEY } from '@skysmack/packages-pass-codes';
import { NgPersonsEpics } from './pass-codes/redux/ng-pass-codes-epics';
import { registerRedux, NgSignalR } from '@skysmack/ng-framework';
import { SignalRPersonProvider } from './pass-codes/signal-r-pass-codes-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPersonsModule {
  constructor(
    epics: NgPersonsEpics,
    // signalR: NgSignalR,
    passCodesSRProvider: SignalRPersonProvider
  ) {
    registerRedux(PASS_CODES_REDUCER_KEY, passCodesReducer, epics);

    // TODO: REVIEW  SIGNAL-R
    // signalR.instance.registerProvider(passCodesSRProvider);
  }
}
