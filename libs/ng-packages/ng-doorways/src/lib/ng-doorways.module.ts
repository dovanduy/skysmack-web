import { NgModule } from '@angular/core';
import { NgDoorwaysEpics } from './doorways/redux/ng-doorways-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { SignalRDoorwayProvider } from './doorways/signal-r-doorways-provider';
import { DOORWAYS_REDUCER_KEY } from './doorways/constants/constants';
import { doorwaysReducer } from './doorways/redux/doorways-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgDoorwaysModule {
  constructor(
    epics: NgDoorwaysEpics,
    // signalR: NgSignalR,
    doorwaysSRProvider: SignalRDoorwayProvider
  ) {
    registerRedux(DOORWAYS_REDUCER_KEY, doorwaysReducer, epics);

    // TODO: REVIEW  SIGNAL-R
    // signalR.instance.registerProvider(doorwaysSRProvider);
  }
}
