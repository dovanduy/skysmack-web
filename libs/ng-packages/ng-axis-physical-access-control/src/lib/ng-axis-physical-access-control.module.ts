import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { ACCESS_POINTS_REDUCER_KEY } from './access-points/constants/constants';
import { accessPointsReducer } from './access-points/redux/access-points-reducer';
import { NgAccessPointsEpics } from './access-points/redux/ng-access-points-epics';
import { accessControllersReducer } from './access-controllers/redux/access-controllers-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgAxisPhysicalAccessControlModule {
  constructor(
    accessPointsEpics: NgAccessPointsEpics,
    accessControllersEpics: NgAccessPointsEpics,
  ) {
    registerRedux(ACCESS_POINTS_REDUCER_KEY, accessPointsReducer, accessPointsEpics);
    registerRedux(ACCESS_POINTS_REDUCER_KEY, accessControllersReducer, accessControllersEpics);
  }
}

