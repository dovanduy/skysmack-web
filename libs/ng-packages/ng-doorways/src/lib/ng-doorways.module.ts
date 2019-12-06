import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { DOORWAYS_REDUCER_KEY } from './doorways/constants/constants';
import { NgDoorwaysEpics } from './doorways/redux/ng-doorways-epics';
import { NgDoorwayRelationsEpics } from './doorway-relations/redux/ng-doorway-relations-epics';
import { SignalRDoorwayProvider } from './doorways/signal-r-doorways-provider';
import { doorwaysReducer } from './doorways/redux/doorways-reducer';
import { DOORWAY_RELATIONS_REDUCER_KEY } from './doorway-relations/constants/constants';
import { doorwayRelationsReducer } from './doorway-relations/redux/doorway-relations-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgDoorwaysModule {
  constructor(
    epics: NgDoorwaysEpics,
    relationsEpics: NgDoorwayRelationsEpics,
    // signalR: NgSignalR,
    doorwaysSRProvider: SignalRDoorwayProvider
  ) {
    registerRedux(DOORWAYS_REDUCER_KEY, doorwaysReducer, epics);
    registerRedux(DOORWAY_RELATIONS_REDUCER_KEY, doorwayRelationsReducer, relationsEpics);

    // TODO: REVIEW  SIGNAL-R
    // signalR.instance.registerProvider(doorwaysSRProvider);
  }
}

