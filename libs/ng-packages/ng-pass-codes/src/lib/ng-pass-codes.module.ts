import { NgModule } from '@angular/core';
import { passCodesReducer, PASS_CODES_REDUCER_KEY } from '@skysmack/packages-pass-codes';
import { NgPassCodesEpics } from './pass-codes/redux/ng-pass-codes-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { SignalRPassCodeProvider } from './pass-codes/signal-r-pass-codes-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPassCodesModule {
  constructor(
    epics: NgPassCodesEpics,
    // signalR: NgSignalR,
    passCodesSRProvider: SignalRPassCodeProvider
  ) {
    registerRedux(PASS_CODES_REDUCER_KEY, passCodesReducer, epics);

    // TODO: REVIEW  SIGNAL-R
    // signalR.instance.registerProvider(passCodesSRProvider);
  }
}
