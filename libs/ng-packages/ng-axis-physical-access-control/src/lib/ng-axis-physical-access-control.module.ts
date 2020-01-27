import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { ACCESS_POINTS_REDUCER_KEY } from './access-points/constants/constants';
import { accessPointsReducer } from './access-points/redux/access-points-reducer';
import { NgAccessPointsEpics } from './access-points/redux/ng-access-points-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgAxisPhysicalAccessControlModule {
  constructor(
    epics: NgAccessPointsEpics,
  ) {
    registerRedux(ACCESS_POINTS_REDUCER_KEY, accessPointsReducer, epics);
  }
}

