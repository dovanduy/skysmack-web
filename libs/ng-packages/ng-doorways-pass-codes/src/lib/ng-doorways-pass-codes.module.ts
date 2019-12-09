import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { DOORWAYS_PASS_CODES_REDUCER_KEY } from './doorways-pass-codes/constants/constants';
import { NgDoorwaysPassCodesEpics } from './doorways-pass-codes/redux/ng-doorways-pass-codes-epics';
import { doorwaysPassCodesReducer } from './doorways-pass-codes/redux/doorways-pass-codes-reducer';
import { NgDoorwaysOptionsEpics } from './doorways-options/redux/ng-doorways-options-epics';
import { DOORWAYS_OPTIONS_REDUCER_KEY } from './doorways-options/constants/constants';
import { doorwaysOptionsReducer } from './doorways-options/redux/doorways-options-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgDoorwaysPassCodesModule {
  constructor(
    epics: NgDoorwaysPassCodesEpics,
    doorwayOptionsEpics: NgDoorwaysOptionsEpics
  ) {
    registerRedux(DOORWAYS_PASS_CODES_REDUCER_KEY, doorwaysPassCodesReducer, epics);
    registerRedux(DOORWAYS_OPTIONS_REDUCER_KEY, doorwaysOptionsReducer, doorwayOptionsEpics);
  }
}

