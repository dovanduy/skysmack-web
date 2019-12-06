import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { DOORWAYS_PASS_CODES_REDUCER_KEY } from './doorways-pass-codes/constants/constants';
import { NgDoorwaysPassCodesEpics } from './doorways-pass-codes/redux/ng-doorways-pass-codes-epics';
import { doorwaysPassCodesReducer } from './doorways-pass-codes/redux/doorways-pass-codes-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgDoorwaysPassCodesModule {
  constructor(
    epics: NgDoorwaysPassCodesEpics
  ) {
    registerRedux(DOORWAYS_PASS_CODES_REDUCER_KEY, doorwaysPassCodesReducer, epics);
  }
}

