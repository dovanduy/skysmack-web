import { NgModule } from '@angular/core';
import { workflowsReducer, definitionsReducer, WORKFLOWS_REDUCER_KEY, DEFINITIONS_REDUCER_KEY } from '@skysmack/packages-workflows';
import { WorkflowsEpics } from './workflows/redux/ng-workflows-epics';
import { registerRedux } from '@skysmack/ng-framework';
import { DefinitionsEpics } from './workflows/redux/ng-definitions-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgWorkflowsModule {
  constructor(
    workflowsEpics: WorkflowsEpics,
    definitionsEpics: DefinitionsEpics
  ) {
    registerRedux(WORKFLOWS_REDUCER_KEY, workflowsReducer, workflowsEpics);
    registerRedux(DEFINITIONS_REDUCER_KEY, definitionsReducer, definitionsEpics);
  }
}
