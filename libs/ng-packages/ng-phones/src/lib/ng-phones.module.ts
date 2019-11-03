import { NgModule } from '@angular/core';
import { NgPhonesEpics } from './phones/redux/ng-phones-epics';
import { PHONES_REDUCER_KEY, phonesReducer, PHONE_LOGS_REDUCER_KEY, phoneLogsReducer, PHONE_NUMBERS_REDUCER_KEY, phoneNumbersReducer } from '@skysmack/packages-phones';
import { registerRedux } from '@skysmack/ng-framework';
import { NgPhoneLogsEpics } from './phone-logs/redux/ng-phone-logs-epics';
import { NgPhoneNumbersEpics } from './phone-numbers/redux/ng-phone-numbers-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPhonesModule {
  constructor(
    phoneEpics: NgPhonesEpics,
    phoneLogsEpics: NgPhoneLogsEpics,
    phoneNumbersEpics: NgPhoneNumbersEpics,
  ) {
    registerRedux(PHONES_REDUCER_KEY, phonesReducer, phoneEpics);
    registerRedux(PHONE_LOGS_REDUCER_KEY, phoneLogsReducer, phoneLogsEpics);
    registerRedux(PHONE_NUMBERS_REDUCER_KEY, phoneNumbersReducer, phoneNumbersEpics);
  }
}
