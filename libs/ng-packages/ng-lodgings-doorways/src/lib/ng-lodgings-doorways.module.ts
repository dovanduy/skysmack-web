import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { LODGINGS_DOORWAYS_REDUCER_KEY } from './lodgings-doorways/constants/constants';
import { NgLodgingsDoorwaysEpics } from './lodgings-doorways/redux/ng-lodgings-doorways-epics';
import { lodgingsDoorwaysReducer } from './lodgings-doorways/redux/lodgings-doorways-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgLodgingsDoorwaysModule {
  constructor(
    epics: NgLodgingsDoorwaysEpics,
  ) {
    registerRedux(LODGINGS_DOORWAYS_REDUCER_KEY, lodgingsDoorwaysReducer, epics);
  }
}

