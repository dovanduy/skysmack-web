import { NgModule } from '@angular/core';
import { NgAccountEpics } from './accounts';
import { registerRedux } from '@skysmack/ng-framework';
import { ACCOUNTS_AREA_KEY, accountReducer, ACCOUNTS_REDUCER_KEY } from '@skysmack/packages-account';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgAccountModule {
  constructor(
    epics: NgAccountEpics
  ) {
    registerRedux(ACCOUNTS_REDUCER_KEY, accountReducer, epics);
  }
}
