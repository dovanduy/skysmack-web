import { NgModule } from '@angular/core';
import { NgAccountEpics } from './accounts';
import { registerRedux } from '@skysmack/ng-redux';
import { ACCOUNT_AREA_KEY, accountReducer } from '@skysmack/packages-account';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgAccountModule {
  constructor(
    epics: NgAccountEpics
  ) {
    registerRedux(ACCOUNT_AREA_KEY, accountReducer, epics);
  }
}
