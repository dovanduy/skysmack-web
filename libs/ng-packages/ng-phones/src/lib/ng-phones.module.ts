import { NgModule } from '@angular/core';
import { NgPhonesEpics } from './phones/redux/ng-phones-epics';
import { PHONES_REDUCER_KEY, phonesReducer } from '@skysmack/packages-phones';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPhonesModule {
  constructor(
    phoneEpics: NgPhonesEpics,
  ) {
    registerRedux(PHONES_REDUCER_KEY, phonesReducer, phoneEpics);
  }
}
