import { NgModule } from '@angular/core';
import { NgDoorwaysEpics } from './doorways/doorways/redux/ng-doorways-epics';
import { SignalRDoorwayProvider } from './doorways/doorways/signal-r-doorways-provider';
import { registerRedux } from '@skysmack/ng-framework';
import { DOORWAYS_REDUCER_KEY, DOORWAY_RELATIONS_REDUCER_KEY } from './doorways/constants/constants';
import { doorwaysReducer } from './doorways/doorways/redux/doorways-reducer';
import { doorwayRelationsReducer } from './doorways/doorway-relations/redux/doorway-relations-reducer';
import { NgDoorwayRelationsEpics } from './doorways/doorway-relations/redux/ng-doorway-relations-epics';

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

